
## vite原理浅析-dev篇(对比webpack)

首先vite不是打包工具，可以理解为一个**项目开发启动器**和**打包工具启动器**，分别对应dev的开发环境和prd的生产环境。

+ 开发环境的特点是**能够解析模块依赖，sourcemap，快速热更新。**

+ 生产环境的特点是**丑化压缩依赖（尽可能减小体积），按需加载，浏览器兼容，将多个本地文件打包成一个bundle或多个第三方依赖打包成一个vender（减少请求及更快的解析），及一些优化项等等**

可以发现，dev和prd环境 其实功能差异很大，所以准备分开讲，希望帮助思路能理的更清楚

[vite原理浅析-prd篇（对比rollup和webpack）](./vite%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90-prd%E7%AF%87%EF%BC%88%E5%AF%B9%E6%AF%94rollup%E5%92%8Cwebpack%EF%BC%89.md)

## 理解vite前，先提一下webpack是如何实现dev服务的？
首先vite之前的vue、react脚手架都一样，底层是基于webpack实现的，dev对应**webpack-dev-server**，prd对应**webpack**

### webpack-dev-server如何让浏览器能够解析模块依赖呢？

问题背景：比如你在源代码内写的`require('xx')`，浏览器是不认识commonjs语法的。即使浏览器比较新可以解析esm，
**但浏览器不知道要去node_modules里去找依赖，** 比如这种 **import vue from 'vue'** 的写法。 **所以解析`cjs`或`esm`的语法 都是webpack来帮我们处理的，** 最终打包成一个bundle，用script标签来加载，这样就可以解决兼容问题了

查看一个 webpack-dev-server 打包后的一个vue应用的入口index.html

+ 可以发现做法是： **把所有依赖（包括第三方库）打包成一个bundle** （main.cb1fd56.js，项目不算大，体积11Mb），然后通过script标签来访问
+ main.cb1fd56.js里面有很多webpack的api及代码注入

```html
<!DOCTYPE html>
<html>
  <head> ... </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="/js/main.cb1fd56.js"></script>
  </body>
</html>
```

### sourcemap方面
因为是打包过的 多个文件合成了1个，所以sourcemap需要额外处理，才方便定位到具体的文件的具体行数，所以webpack的文件打包出来会非常大， 此处vite会简单很多

### 热更新方面
当项目变大后，热更新会越来越慢（因为每次都要重新打包），项目的启动速度也会越来越慢。vite在热更新方面有极大的提升

## 进入正题，浅析vite原理
准备以下几个方面入手

1. vite基本原理-浏览器原生支持esm
2. vite热更新和dev构建为什么快？
3. vite热更新是如何处理的？
4. sourcemap是如何处理的？
5. vite对源文件做的转换和处理？（比如让浏览器知道去node_modules里面去找依赖）
6. vite第一次构建为什么会慢？
7. 为什么需要做依赖预构建？
8. 碰到大模块怎么处理？（例如有上百个模块的组件库）
9. 依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）会如何处理？
10. 公共依赖部分的处理？（比如a、b、c 3个文件 同时依赖一个x包）
11. 一些webpack用习惯的功能该如何处理？（比如某些webpack api，loader，plugin）


### vite基本原理-浏览器原生支持esm

vite基本原理是-**浏览器原生支持esm**

好处：**可以不用打包（热更新快的原理），浏览器直接可以识别esm模块（import导入export导出）**

+ 注意点：不能识别commonjs（require、module.exports）。所以源代码内都要用esm开发

+ esm的好处是可以做tree shaking，让源代码的体积变得更小，也是js未来的主流。
    + 过去的年代，js只能用script标签引入模块，后面有了一些“hack”包，可以支持类似require的写法，比如amd模块。在后来commonjs标准借助node诞生，commonjs还是有缺点，是运行时的，动态的，不支持tree shaking
    + 模块这里不是很清楚的话，可以看我的另外2篇 [前端模块标准之CommonJS和ES6 Module的区别](https://juejin.cn/post/6959360326299025445) / [前端模块标准之CommonJS、ES6 Module、AMD、UMD介绍](https://juejin.cn/post/6959360215674257415)

**vite dev环境默认的目标浏览器（注意浏览器版本）** （只是dev环境的兼容性，prd走rollup打包，可以达到类似webpack的效果）

+ 能 [在 script 标签上支持原生 ESM 兼容性查看（<script type="module"></script>）](https://caniuse.com/es6-module) 和 [原生 ESM 动态导入 兼容性查看](https://caniuse.com/es6-module-dynamic-import)（import('xx').then()）

+ [ESM导入的MDN文档介绍( 含动态ESM导入 import('xx').then() )](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

dev浏览器版本小结

<img :src="$withBase('/images/web.webp')" alt="web">


### vite热更新和dev构建为什么快？

首先快慢是看和谁对比，此处一般指的是和 **webpack的dev-server对比。**


**webpack-dev-server慢的原因是，每次热更新都要重新打包。** 当我们开始构建越来越大型的应用时，需要处理的 JavaScript 代码量也呈指数级增长。包含数千个模块的大型项目相当普遍。我们开始遇到性能瓶颈 —— 使用 JavaScript 开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用 HMR，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。

**vite不用打包，** 只需处理一些源代码的路径问题（后面会讲）和预构建（后面会讲）， **所以几乎可以秒开 和 快速热更新，并且项目热更新的速度不会随项目变大而变慢，** 因为vite不用重新打包，只需更新对应的文件即可


### vite热更新是如何处理的？

**大致过程和webpack-dev-server的差不多，但是vite可以不用打包，只需要更新修改过的文件即可**

过程：

+ 起2个服务：客户端服务，websocket服务，
+ 监听本地文件变更，区分变更的类型，然后做相应的处理，通过ws通知客户端服务，客户端服务在去加载新的资源或刷新网页
+ 热更新时，不同的文件有不同的处理方式
    + 当你只修改了 script 里的内容时：不会刷新，Vue 组件重新加载 **（会重新走生命周期）**  
    + 当你只修改了 template 里的内容时： 不会刷新，Vue 组件重新渲染 **（不会重新走生命周期）**
    + 样式更新，样式移除时：**不会刷新，直接更新样式，覆盖原来的**
    + js 文件更新时：**网页重刷新**

### sourcemap是如何处理的？
分为2块

1. 用户写的源代码，vite不会对进行打包，所以vite的sourcemap要简单很多
    + dev环境下vite解析出来的单个.vue文件  **几乎和原代码一样大，** 而webpack因为要 **注入代码和sourcemap和热更新代码，** 所以会很大。博主做过测试，一个 **几kb** 的.vue文件，webpack dev环境去访问，至少会有 **70多kb** 的大小！
2. 第三方依赖的话，在 **预构建阶段，** 借助esbuild打包好（sourcemap有独立开源库处理）

### vite对源文件做的转换和处理（比如让浏览器知道去node_modules里面去找依赖）
贴一段vite解析后的main.js的代码，就会很清楚
+ vite会去转换依赖的路径，让浏览器可以通过文件路径访问到
```javascript
// vite处理前
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import './assets/css/common2.less'
import './permission'
import { i18n } from './i18n'
import App from './App.vue' 
...

---------------------------------------------------------------------------

// vite处理后
import { createApp } from '/node_modules/.vite/vue.js?v=9c1d7fbb'
import Antd from '/node_modules/.vite/ant-design-vue.js?v=9c1d7fbb'
import '/node_modules/_ant-design-vue@3.0.0-beta.5@ant-design-vue/dist/antd.less'
import '/src/assets/css/common2.less'
import '/src/permission.js'
import { i18n } from '/src/i18n.js'
import App from '/src/App.vue' 
...
```

### vite第一次构建为什么会慢？碰到大模块怎么处理？（例如有上百个模块的组件库）
第三方依赖多一点的项目的小伙伴，应该能发现， **vite的第一次构建，其实是不快的。但第一次之后，以后重启项目都会很快，1s内就可以完成。**
+ 第一次之后快的原因：
    + 因为有缓存，缓存是放在/node_modules/.vite文件内的。
    + 如果某些时候碰到 依赖不更新，可以在vite命令后，加上--force，会自动删除 node_modules的.vite文件，然后重新构建
+ 第一次构建慢的原因：vite需要做  **依赖预构建**

### 为什么需要做依赖预构建？
以下2点来源于vite原文：
1. **需要兼容 CommonJS 和 UMD： **  开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。

当转换 CommonJS 依赖时，Vite 会执行智能导入分析，这样即使导出是动态分配的（如 React），按名导入也会符合预期效果：

```javascript
// 符合预期
import React, { useState } from 'react'
```

2. **性能：**   Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块，以提高后续页面加载性能。


一些包将它们的 ES 模块构建作为许多单独的文件相互导入。例如，[lodash-es 有超过 600 个内置模块！](https://unpkg.com/browse/lodash-es@4.17.21/)当我们执行  **import { debounce } from 'lodash-es'**  时，浏览器同时发出 600 多个 HTTP 请求！尽管服务器在处理这些请求时没有问题，但大量的请求会在浏览器端造成网络拥塞，导致页面的加载速度相当慢。


通过预构建  **lodash-es**  成为一个模块，我们就只需要一个 HTTP 请求了！

**个人简单的总结成2点：**

1.  **碰到大模块怎么处理？（例如有上百个模块的组件库）vite需要做预解析，打包成一个bundle（减少请求，否则要请求上百个模块）**
    + 预构建是使用 [esbuild](https://esbuild.github.io/)打包的， esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

2.  **依赖也通常会存在多种模块化格式（例如 CommonJS 或者 UMD），需要通过esbuild 将依赖打包为 ESM（浏览器只能识别ESM模块）**


### 碰到大模块怎么处理？（例如有上百个模块的组件库）
+ 看上方解释：为什么需要做依赖预构建

### 依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）会如何处理？
+ 看上方解释：为什么需要做依赖预构建？


### 公共依赖部分的处理（比如a、b、c 3个文件 同时依赖一个x包）
+ 如果是esm的依赖包，dev环境中，浏览器会自动处理，公共的x包只会下载和解析一次
+ 如果是cjs或umd的包，vite会有一个预构建的过程，会先把他们转成esm包，然后同上

### 一些webpack用习惯的功能该如何处理？（比如某些webpack提供的api，loader，plugin）
比如有小伙伴想迁移之前webpack的项目到vite，需要注意的点：

1. webpack自身提供的api（[webpack.docschina.org/api/module-… ](https://webpack.docschina.org/api/module-methods/#require)） vite肯定是不支持的
2. vite中不支持cjs（不支持require等模块导入导出的方法），还有AMD的define语法，需要转成esm.（第三方依赖的话，vite会自动转成esm）
3. 浏览器已经原生支持 import动态导入(能支持() => import('xx'))，所以统一用把webpack中可能有的写法 require.ensure都改成import()： [import的MDN介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

    + 此处有一点区别，webpack提供的import() 除了能加载esm外，还能加载非标准esm（比如cjs，umd等），是webpack自己做的处理。vite则用的是原生的import() 只支持标准esm模块     （2者都支持代码拆分，prd是rollup来支持）
    + 导入多个模块的话：vite有一个 **import.meta,glob** 的方法，可以从文件系统导入多个模块 ：[cn.vitejs.dev/guide/featu…](https://cn.vitejs.dev/guide/features.html#glob-import)(webpack会用自己实现的api，这里要换成vite支持的api)


**loader方面：**
+ vite没有loader的接口，基本功能都内置好了
+ css的处理 和 预处理器部分，都内置好了，如果是要支持预处理器的话 需要安装对应依赖

```shell
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus

如果是用的是单文件组件，可以通过 `<style lang="sass">`（或其他预处理器）自动开启。

Vite 为 Sass 和 Less 改进了 `@import` 解析，以保证 Vite 别名也能被使用。另外，`url()` 中的相对路径引用的，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性。
```
+ dev的css，最终会做为style标签，放在head内。例如：
<img :src="$withBase('/images/css.webp')" alt="css">


+ 图片和字体部分，作为静态资源处理。类似file-loader，**处理链接就好了**
    + 比如本地的图片资源，源代码内，写的是相对路径(../assets/image/hll.png)或别名(@/assets/image/hll.png)，最终会被vite解析成  **服务器可以找到的 准确的路径，**如：<img src="/src/assets/image/hll.png">
+ 更加定制化的需求
    + 可能暂时webpack更合适，比如，你想支持 .myVue 或 .myReact 的文件，这种情况，可以写webpack的loader的来支持。

**plugin方面：** 
+ dev是开发环境，不需要做打包优化，所以dev几乎不需要写plugin。更多的需求在prd环境用rollup打包，vite能支持插件的编写：[cn.vitejs.dev/guide/api-p… ](https://cn.vitejs.dev/guide/api-plugin.html)，也可以写rollup插件 （此部分会重点在 下一篇在讲）

## 总结一下
dev模式的vite
1. vite基本原理是 **无需打包，依赖浏览器原生支持esm** 去解析模块。
    + 不过需要 **高版本浏览器，**chorme都要61以上，支持动态import要chorme63以上
2. 构建速度和热更新速度都非常非常快，热更新速度不会随项目变大而变慢
    + 但第一次构建还是需要时间，之后就很快。第一次会做 **依赖预构建，用的esbuild**（速度很快）

另外**为什么webpack做不到，webpack必须得打包，并且打包出来的结果很丑，结构很乱 有很多注入代码？**

+ **因为webpack诞生在es6出来之前，当时没有esm的概念，** webpack只能自己实现 类似require 的功能函数，并且利用 iife + 函数作用域，确保模块之前的作用域不会冲突

作者：bigtree
链接：https://juejin.cn/post/7050293652739850271
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



