import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { computerScienceNotes } from './collections'
import busuanzi from 'busuanzi.pure.js'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Jerry',
  description: '车顶上绑着飞机发动机',

  bundler: viteBundler(),

  theme: plumeTheme({

    hostname: 'jerrysheh.com',

    footer: {copyright: `
        Copyright © 2017-2025 Jerry 
        访客人数：<span id="busuanzi_value_site_uv" </span>
      `},

    collections: [

      ...computerScienceNotes,

      {
        type: 'post', 
        dir: 'blog',
        title: '博客' ,
        pagination: 15,
        include: ['**/*.md'],
        exclude: ['.vuepress/', '**/README.md'],
      },

      {
        type: 'doc', 
        dir: 'crash-course',
        linkPrefix: '/crash-course/',
        title: 'crash-course',
        sidebar: 'auto', 
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
        dir: 'sentences',
        linkPrefix: '/sentences/',
        title: '醍醐灌顶',
        sidebar: 'auto', 
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
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
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
