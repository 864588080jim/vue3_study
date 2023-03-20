## vite原理浅析-prd篇（对比rollup和webpack）
接到上集：[vite原理浅析-dev篇](./vite%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90-dev%E7%AF%87%EF%BC%88%E5%AF%B9%E6%AF%94webpack%EF%BC%89.md)

通过上集我们可以知道，**vite在dev环境中 是不打包的（除了node_modules的依赖），** 解析模块的任务都交给浏览器处理了（ **高版本浏览器原生支持esm语法** ），语法要求是esm

**现在prd环境了，问题来了：**


1. prd是否打包？如何打包？
2. 打包出来的是哪种模块？
3. 打包的产物对浏览器兼容性如何？
4. 为什么prd打包选择rollup，不用webpack，或esbuild？
5. 为什么打包的文件比webpack小很多（高版本webpack也有tree shaking）？

## prd是否打包？如何打包？
需要打包， 使用rollup打包 ： [rollupjs.org/guide/en/](https://rollupjs.org/guide/en/)

## 打包出来的是哪种模块？
最低支持es2015（也就是esm）（[官网有写](https://cn.vitejs.dev/guide/build.html#browser-compatibility)）


## 打包的产物对浏览器兼容性如何？

因为vite build 目标还是使用esm模块，所以兼容性的根本是跟着 **esm模块的兼容性** 走的
+ vite的目标是  **利用高版本浏览器原生支持esm的能力，** 这样的好处是，不用像webpack一样写大量的polyfill代码和iife那样的“丑结构”（深层次的原因 可以看我上一篇，有详细解释：[rollup打包产物解析及原理（对比webpack）](https://juejin.cn/post/7054752322269741064) ）

**兼容性： （其实就是 [动态import的兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#%E5%8A%A8%E6%80%81import) ）**
+ 以chorme为例，chorme需要63版本以上
<img :src="$withBase('/images/web.webp')" alt="web">

**如果需要兼容chorme63以下的浏览器**
1. 参考 [官网解决方法](https://cn.vitejs.dev/guide/build.html#browser-compatibility)
2. 或 用vite开发dev（热更新很爽），配置webpack打包生产包上线

**结论：要用vite开发并打包上线项目的话，此项目需要可以不兼容老浏览器**


## 为什么prd打包选择rollup，不用webpack，或esbuild？
先直接说结论：
1. esbuild主要是打包js很快，但是生产包的是 **应用程序，**除了.js文件外，还会有 **很多其他的资源** 如.css 图片 字体 等等。 **暂时rollup和webpack的生态更成熟**
    + esbuild主要用在dev的预构建（不太熟悉vite dev的话，可以参考[这篇vite原理浅析-dev篇](./vite%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90-dev%E7%AF%87%EF%BC%88%E5%AF%B9%E6%AF%94webpack%EF%BC%89.md)）

2. 为什么不用webpack。是一个很大的话题，可以参考我的上一篇[rollup打包产物解析及原理（对比webpack）](https://juejin.cn/post/7054752322269741064)


**简单的总结rollup好处的话是：**
1. 对比esbuild：打包模块类型复杂的应用程序方面，**生态更成熟**
2. 对比webpack
    1. 打出来的包**体积小**
    2. 打出来的包**结构清晰** （不用像webpack一样，用 iife + function包裹模块）， **几乎无额外代码注入。**
    3. 符合js未来模块标准（esm）（ **webpack暂时不支持打出esm的模块（实验中）**）


## 为什么打包的文件比webpack小很多（高版本webpack也有tree shaking）？
可以参考我的上一篇，有详细写原因 [rollup打包产物解析及原理（对比webpack）](./vite%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90-dev%E7%AF%87%EF%BC%88%E5%AF%B9%E6%AF%94webpack%EF%BC%89.md)

## 最终总结
1. vite prd **用 rollup 打包** ，打包出来的体积要比用webpack打包小很多
    1. 对比esbuild：打包模块类型复杂的应用程序方面， **生态更成熟**
    2. 对比webpack 
        1. 打出来的包**体积小**
        2. 打出来的包**结构清晰** （不用像webpack一样，用 iife + function包裹模块）， **几乎无额外代码注入。**
        3. 符合js未来模块标准（esm）（ **webpack暂时不支持打出esm的模块（实验中）**）

2. **打包出来的模块，最低都是es2015。** 所以需要比较高版本的浏览器（chorme63以上）

如果需要兼容chorme63以下的浏览器
    1. 参考 [官网解决方法](https://cn.vitejs.dev/guide/build.html#browser-compatibility)
    2. 或 用vite开发dev（热更新很爽），配置webpack打包生产包上线

---
不了解vite dev的，可以参考笔者的这篇[vite原理浅析-dev篇](./vite%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90-dev%E7%AF%87%EF%BC%88%E5%AF%B9%E6%AF%94webpack%EF%BC%89.md)

rollup 和 webpack 的打包产物原理 及 对比，和 更详细和深层原理的解释，可以参考：   

[webpack打包产物解析及原理（含cjs/esm/代码分离/懒加载）](https://juejin.cn/post/7053998924071174175)

[rollup打包产物解析及原理（对比webpack）](https://juejin.cn/post/7054752322269741064)

