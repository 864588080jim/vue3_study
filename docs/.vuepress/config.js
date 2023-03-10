module.exports = {
  base: '/markdown/', /* 基础虚拟路径 */
  dest: 'docs/dist', /* 打包文件基础路径, 在命令所在目录下 */
  title: '学习笔记', // 标题
  description: 'markdown学习笔记', // 标题下的描述
  themeConfig: { // 主题配置
    logo: '/images/logo.jpeg',
    nav: [
      { text: 'javascript',
      items: [
        { text: 'typescript', link: 'http://spaceofbing.cn/typescript' },
      ]},
      {
        text: 'vue3',
        items: [
          { text: 'vue3', link: 'http://spaceofbing.cn/vue3' },
          { text: 'router', link: 'http://spaceofbing.cn/router' },
          { text: 'pinia', link: 'http://spaceofbing.cn/pinia' }
        ]
      },
    ]
  }
}