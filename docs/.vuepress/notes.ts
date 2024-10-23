import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const aboutNote = defineNoteConfig({
  dir: 'about',
  link: '/about/',
})

const anpuNote = defineNoteConfig({
    // 声明笔记的目录，相对于 `notes.dir`，这里表示 `notes/typescript` 目录
    dir: 'anpu',
    // 声明笔记的链接前缀，与 `notes.link` 拼接，这里表示 `/typescript/`
    // 笔记内的所有文章会以 `/typescript/` 作为访问链接前缀。
    link: '/anpu/',
    sidebar: 'auto'
})

const sentencesNote = defineNoteConfig({
  dir: 'sentences',
  link: '/sentences/',
  sidebar: [{
    text: '醍醐灌顶',
    prefix: '/sentences/',
    items: [
      '2024/',
      '2023/',
      '2022/',
      '2021/',
      '2020/',
      '2019/',
      '2018/',
    ]
  },
  {
    text: '书·影·音',
    prefix: '/sentences/',
    items: [
      'xiaomi-thinking/',
      'reply1994/'
    ]
  }
  ]
})

const crashCourseNote = defineNoteConfig({
  dir: 'crash-course',
  link: '/crash-course/',
  sidebar: 'auto'
})

const javaNote = defineNoteConfig({
  dir: 'java',
  link: '/java/',
  sidebar: 'auto'
})

const netWorkingNote = defineNoteConfig({
  dir: 'networking',
  link: '/networking/',
  sidebar: 'auto'
})

const computerSystemNote = defineNoteConfig({
  dir: 'computer-system',
  link: '/computer-system/',
  sidebar: 'auto'
})

const dataStructreSystemNote = defineNoteConfig({
  dir: 'data-structure',
  link: '/data-structure/',
  sidebar: 'auto'
})

const patternDesignSystemNote = defineNoteConfig({
  dir: 'pattern-design',
  link: '/pattern-design/',
  sidebar: 'auto'
})

const gitNote = defineNoteConfig({
  dir: 'git',
  link: '/git/',
  sidebar: 'auto'
})

const dbNote = defineNoteConfig({
  dir: 'db',
  link: '/db/',
  sidebar: 'auto'
})

const interviewNote = defineNoteConfig({
  dir: 'interview',
  link: '/interview/',
  sidebar: 'auto'
})

export const notes = defineNotesConfig({
  dir: '/notes/',
  link: '/',
  notes: [
    aboutNote, 
    anpuNote, 
    sentencesNote, 
    crashCourseNote,
    javaNote, 
    netWorkingNote, 
    computerSystemNote,
    dataStructreSystemNote,
    patternDesignSystemNote,
    gitNote,
    dbNote,
    interviewNote
  ],
})
