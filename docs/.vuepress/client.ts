import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import CustomComponent from './theme/components/Custom.vue'
import busuanzi from 'busuanzi.pure.js'



// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app ,router}) {
    // app.component('RepoCard', RepoCard)
    // app.component('CustomComponent', CustomComponent)

    //  busuanzi.fetch()
    app.component('busuanzi', busuanzi)
  },
})
