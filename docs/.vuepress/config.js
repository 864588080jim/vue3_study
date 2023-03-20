module.exports = {
  base: '/pinia/', /* 基础虚拟路径 */
  dest: 'docs/dist', /* 打包文件基础路径, 在命令所在目录下 */
  title: 'Pinia 快速上手', // 标题
  description: 'Pinia学习笔记', // 标题下的描述
  themeConfig: { // 主题配置
    logo: '/images/logo.jpeg',
    nav: [
      { text: 'js', link: 'http://spaceofbing.cn/js' },
      { text: 'es6', link: 'http://spaceofbing.cn/es6' },
      {
        text: 'vue3',
        items: [
          { text: 'vue3', link: 'http://spaceofbing.cn/vue3' },
          { text: 'router', link: 'http://spaceofbing.cn/router' },
          { text: 'pinia', link: 'http://spaceofbing.cn/pinia' }
        ]
      },
      { text: 'node', link: 'http://spaceofbing.cn/node' },
    ],
    sidebar: [ // 左侧导航
      '00_课程介绍',
      {
        title: 'Pinia原理浅析',
        collapsable: false,
        children: [ // 下级列表
          'chapter1/vite原理浅析-dev篇（对比webpack）',
          'chapter1/vite原理浅析-prd篇（对比rollup和webpack）',
        ]
      },

      {
        title: 'Pinia基础使用',
        collapsable: false,
        children: [
          'chapter2/Pinia使用state、getters、actions',
          'chapter2/Pinia模块化',
          'chapter2/Pinia持久化存储'
        ]
      }
    ]
  },

  head: [
    // ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./images/favicon.ico` }]
  ]
}