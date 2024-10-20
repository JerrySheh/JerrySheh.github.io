import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { notes } from './notes'
import busuanzi from 'busuanzi.pure.js'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Jerry',
  description: '车顶上绑着飞机发动机',

  bundler: viteBundler(),

  theme: plumeTheme({
    // 添加您的部署域名
    hostname: 'jerrysheh.com',
    notes,
    footer: {copyright: `
        Copyright © 2017-2024 Jerry 
        访客人数：<span id="busuanzi_value_site_uv" </span>
      `},
    blog: {
      /**
       * 通过 glob string 配置包含文件，
       * 默认读取 源目录中的所有 `.md` 文件，但会排除 `notes` 配置中用于笔记的目录。
       */
      include: ['**/*.md'],
      // 如果希望只将源目录下某个目录下的文章读取为博客文章，比如 `blog` 目录，可以配置为：
      // include: ['blog/**/*.md'],

      /**
       * 通过 glob string 配置排除的文件，相对于 源目录
       */
      exclude: ['.vuepress/', '**/README.md'],

      // 禁用分页
      // pagination: false,
      // 每页显示的文章数量
      pagination: 15,
    },
    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        //   强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
          languages: ["js","ts","html","css","c","xml","java","javascript","go","shell","bash","c++","python","sql","json","scala"],
        },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      // markdownPower: {
      //   pdf: true,
      //   caniuse: true,
      //   plot: true,
      //   bilibili: true,
      //   youtube: true,
      //   icons: true,
      //   codepen: true,
      //   replit: true,
      //   codeSandbox: true,
      //   jsfiddle: true,
      //   repl: {
      //     go: true,
      //     rust: true,
      //     kotlin: true,
      //   },
      // },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },


  }),
})
