import { defineCollection, defineCollections } from 'vuepress-theme-plume'


const javaNote = defineCollection({
  type: 'doc', 
  dir: 'computer-science/java',
  title: 'Java',
  linkPrefix: '/java/',
  sidebar: 'auto',
  sidebarCollapsed: false, 
})

const netWorkingNote = defineCollection({
  type: 'doc', 
  title: '计算机网络',
  dir: 'computer-science/networking',
  linkPrefix: '/networking/',
  sidebar: 'auto'
})

const computerSystemNote = defineCollection({
  type: 'doc', 
  title: '计算机系统',
  dir: 'computer-science/computer-system',
  linkPrefix: '/computer-system/',
  sidebar: 'auto'
})

const dataStructreNote = defineCollection({
  type: 'doc', 
  title: '数据结构和算法',
  dir: 'computer-science/data-structure',
  linkPrefix: '/data-structure/',
  sidebar: 'auto'
})

const patternDesignNote = defineCollection({
  type: 'doc', 
  title: '设计模式',
  dir: 'computer-science/pattern-design',
  linkPrefix: '/pattern-design/',
  sidebar: 'auto'
})

const dbNote = defineCollection({
  type: 'doc', 
  title: '数据库',
  dir: 'computer-science/db',
  linkPrefix: '/db/',
  sidebar: 'auto'
})

const interviewNote = defineCollection({
  type: 'doc', 
  title: '面试题',
  dir: 'interview',
  linkPrefix: '/interview/',
  sidebar: 'auto'
})

export const computerScienceNotes = defineCollections(
   [
    javaNote, 
    netWorkingNote, 
    computerSystemNote,
    dataStructreNote,
    patternDesignNote,
    dbNote,
    interviewNote
  ]
)
