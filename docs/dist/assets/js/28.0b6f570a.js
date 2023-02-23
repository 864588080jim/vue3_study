(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{381:function(s,t,a){"use strict";a.r(t);var e=a(42),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"使用vuepress搭建在线文档网站"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用vuepress搭建在线文档网站"}},[s._v("#")]),s._v(" 使用VuePress搭建在线文档网站")]),s._v(" "),a("h2",{attrs:{id:"_0-在线文档"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_0-在线文档"}},[s._v("#")]),s._v(" 0. 在线文档")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"}},[s._v("VuePress官方在线文档"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"_1-搭建基本环境"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-搭建基本环境"}},[s._v("#")]),s._v(" 1. 搭建基本环境")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将 VuePress 作为一个本地依赖安装")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -D vuepress\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 新建一个 docs 文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" docs\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 新建一个文件: docs/README.md")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'# Hello VuePress!'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" docs/README.md\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动文档项目")]),s._v("\nnpx vuepress dev docs\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 构建静态文件")]),s._v("\nnpx vuepress build docs\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- docs\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- .vuepress\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- config.js\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("-- README.md\n")])])]),a("h2",{attrs:{id:"_2-配置ts教程文档"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-配置ts教程文档"}},[s._v("#")]),s._v(" 2. 配置ts教程文档")]),s._v(" "),a("ol",[a("li",[s._v("整体结构")])]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("|-- dist\n|-- dics\n  |-- .vuepress\n    |-- public\n      |-- ts-logo.png\n    |-- config.js\n  |-- chapter1\n    |-- 01_初识TS.md\n    |-- 02_安装TS.md\n    |-- 03_HelloWorld.md\n  |-- chapter2\n    |-- 1_type.md\n    |-- 2_interface.md\n    |-- 3_class.md\n    |-- 4_function.md\n    |-- 5_generic.md\n    |-- 6_other.md\n  |-- chapter3\n    |-- 01_react.md\n    |-- 02_vue.md\n  |-- chapter4\n    |-- README.md\n  |-- README.md\n|-- package.json\n")])])]),a("ol",[a("li",[s._v("docs/.vuepress/config.js")])]),s._v(" "),a("div",{staticClass:"language-javacript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("// 注意: base的值为github仓库的名称\nmodule.exports = {\n  base: '/ts-study/', /* 基础虚拟路径: */\n  dest: 'dist', /* 打包文件基础路径, 在命令所在目录下 */\n  title: 'TypeScript 入门', // 标题\n  description: '学习使用 TypeScript', // 标题下的描述\n  themeConfig: { // 主题配置\n    sidebar: [ // 左侧导航\n      {\n        title: '初识 TypeScript', // 标题\n        collapsable: false, // 下级列表不可折叠\n        children: [ // 下级列表\n          'chapter1/01_初识TS',\n          'chapter1/02_安装TS',\n          'chapter1/03_HelloWorld'\n        ]\n      },\n      {\n        title: 'TypeScript 常用语法',\n        collapsable: false,\n        children: [\n          'chapter2/1_type',\n          'chapter2/2_interface',\n          'chapter2/3_class',\n          'chapter2/4_function',\n          'chapter2/5_generic',\n        ]\n      },\n    ]\n  }\n}\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("docs/README.md")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("---\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#首页")]),s._v("\nhome: "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("  \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 图标")]),s._v("\nheroImage: /ts-logo.png\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 按钮文本")]),s._v("\nactionText: 开始学习 →\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 按钮点击跳转路径")]),s._v("\nactionLink: /chapter1/01_初识TS\n---\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("package.json")])]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"doc:dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress dev docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"doc:build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress build docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"doc:deploy"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"gh-pages -d docs/dist"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h2",{attrs:{id:"_3-发布到gitpage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-发布到gitpage"}},[s._v("#")]),s._v(" 3. 发布到gitpage")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("使用git管理当前项目")])]),s._v(" "),a("li",[a("p",[s._v("将打包的项目推送到gitpage")])])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 下载工具包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" -D gh-pages\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 执行打包命令")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" doc:build\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 执行部署命令")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" doc:deploy\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);