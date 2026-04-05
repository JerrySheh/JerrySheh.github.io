import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '博客', link: '/' },
  // {
  //    text: '文章分类',
  //    items: [
  //           { text: '目录', link: '/blog/categories/' }, 
  //           { text: '标签', link: '/blog/tags/' }, 
  //           { text: '归档', link: '/blog/archives/' },
  //         ]
  // },
  {
    text: 'crash course',
    items: [
      { text: 'Computer Science（计算机科学）', link: '/crash-course/computer-science/1/' },
      { text: 'Artificial Intelligence（人工智能）', link: '/crash-course/ai/1/' },
      { text: 'Economics（经济学）', link: '/crash-course/economics/1/' },
      { text: 'Psychology（心理学）', link: '/crash-course/psychology/1/' },
      { text: 'Scientific Thinking（科学思维）', link: '/crash-course/scientific-thinking/1/' },
    ]
  },
  {
    text: '计算机',
    items: [
      { text: '计算机术语速查手册', link: '/computer-science-quick-reference/' },
      { text: 'Java', link: '/java/kk3w1ne4/' },
      { text: '人工智能', link: '/blog/2026/intro-ai/' },
      { text: '计算机网络', link: '/networking/preview/' },
      { text: '数据结构与算法', link: '/data-structure/leu82fhp/' },
      { text: '计算机系统', link: '/computer-system/intro/' },
      { text: '数据库和缓存', link: '/db/sql-notes/' },
      { text: '信息安全', link: '/article/ibzm0tem/' },
      { text: '设计模式', link: '/pattern-design/strategy/' },
      { text: '正则表达式', link: '/regular/' },
      { text: 'git', link: '/git/' },
      { text: '面试题', link: '/interview/' },
    ]
  },
  { text: '安溥·與你握手', link: '/anpu/' },
  { text: '书影音游', link: '/notes/' },
  {
    text: '醍醐灌顶',
    items: [
      { text: '醍醐灌顶', link: '/sentences/' },
      { text: '知识', link: '/knowledges/multidisciplinary-principles/' },
      { text: '草台班子合集', link: '/knowledges/the-world-is-one-giant-ragtag-crew/' },
    ]
  },
  {
    text: '工具',
    items: [
      { text: '电影字幕拼接', link: '/webapp/subtitle-joiner' },
      { text: '二维码生成助手', link: '/webapp/qrcode-generator' },
    ]
  }, { text: '关于', link: '/about/' },

])
