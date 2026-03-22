import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { computerScienceNotes } from './collections'
import busuanzi from 'busuanzi.pure.js'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Jerry｜知识索引',
  description: '车顶上绑着飞机发动机',

  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          // // 将 fflate/browser 重定向到 fflate
          // // 这会让 Vite 使用支持 ESM 的主入口，而不是浏览器专用的 CJS 版本
          // 'fflate/browser': 'fflate',
        },
      },
    },
  }),

  theme: plumeTheme({

    hostname: 'jerrysheh.com',

    footer: {
      copyright: `
        Copyright © 2017-2026 Jerry 
        访客人数：<span id="busuanzi_value_site_uv" </span>
      `
    },

    markdown: {
      timeline: true,
      demo: true
    },

    collections: [

      ...computerScienceNotes,

      {
        type: 'post',
        dir: 'blog',
        title: '博客',
        pagination: 10,
        include: ['**/*.md'],
        exclude: ['.vuepress/', '**/README.md'],
      },

      {
        type: 'doc',
        dir: 'crash-course',
        linkPrefix: '/crash-course/',
        title: 'crash-course',
        sidebar: 'auto',
        sidebarCollapsed: true
      },

      {
        type: 'doc',
        dir: 'anpu',
        linkPrefix: '/anpu/',
        title: '安溥·與你握手',
        sidebar: 'auto',
      },

      {
        type: 'doc',
        dir: 'notes',
        linkPrefix: '/notes/',
        title: '书·影·音·游',
        sidebar: 'auto',
      },

      {
        type: 'doc',
        dir: 'knowledges',
        linkPrefix: '/knowledges/',
        title: '知识',
        sidebar: 'auto',
      },

      {
        type: 'doc',
        dir: 'sentences',
        linkPrefix: '/sentences/',
        title: '醍醐灌顶',
        sidebar: ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      },

      {
        type: 'doc',
        dir: 'webapp',
        linkPrefix: '/webapp/',
        title: '工具',
      },

      {
        type: 'doc',
        dir: 'about',
        linkPrefix: '/about/',
        title: '关于',
        sidebar: 'auto',
      }

    ],




    // 代码高亮配置
    codeHighlighter: {
      themes: { light: 'github-light', dark: 'github-dark' },
      notationDiff: true,
      notationErrorLevel: true,
      notationFocus: true,
      notationHighlight: true,
      notationWordHighlight: true,
      highlightLines: true,
      collapsedLines: false,
      lineNumbers: true,
    },

    plugins: {
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
