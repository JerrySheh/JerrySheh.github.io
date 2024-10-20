import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
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
           { text: 'Computer Science', link: '/crash-course/computer-science/1/' }, 
           { text: 'Economics', link: '/crash-course/economics/1/' }, 
         ]
  },
  {
    text: '计算机',
    items: [
           { text: 'Java', link: '/java/' }, 
           { text: '计算机网络', link: '/networking/vhlkdsuw/' }, 
           { text: '数据结构', link: '/data-structure/leu82fhp/' }, 
           { text: '操作系统', link: '/computer-system/lbudvq6j/' }, 
           { text: '数据库', link: '/db/d7ls353u/' }, 
           { text: '设计模式', link: '/pattern-design/strategy/' }, 
           { text: '正则表达式', link: '/regular/' }, 
           { text: 'git', link: '/git/' }, 
         ]
  },
  { text: '安溥·與你握手', link: '/anpu/' },
  { text: '醍醐灌顶', link: '/sentences/' },
  { text: '关于', link: '/about/' },
  // {
  //   text: '笔记',
  //   items: [{ text: '示例', link: '/notes/demo/README.md' }]
  // },
])
