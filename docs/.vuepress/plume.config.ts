import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/images/blog/ava.png',
  // your git repo url
  docsRepo: '',
  docsDir: 'docs',

  appearance: true,

  profile: {
    avatar: '/images/blog/ava.png',
    name: 'Jerry',
    description: '车顶上绑着飞机发动机',
    // circle: true,
    location: 'Shenzhen',
    // organization: '',
  },

  navbar,
  notes,
  social: [
    { icon: 'github', link: 'https://github.com/jerrySheh' },

    { icon: { svg: `
<svg width="800px" height="800px" viewBox="0 -3.5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-414.000000, -261.000000)" fill="#000000">
            <path d="M430,275.916 L426.684,273.167 L415.115,285.01 L444.591,285.01 L433.235,273.147 L430,275.916 L430,275.916 Z M434.89,271.89 L445.892,283.329 C445.955,283.107 446,282.877 446,282.634 L446,262.862 L434.89,271.89 L434.89,271.89 Z M414,262.816 L414,282.634 C414,282.877 414.045,283.107 414.108,283.329 L425.147,271.927 L414,262.816 L414,262.816 Z M445,261 L415,261 L430,273.019 L445,261 L445,261 Z" id="mail" sketch:type="MSShapeGroup">
</path>
        </g>
    </g>
</svg>
      `, name: 'mail' },
      link: 'mailto:jerrysheh@gmail.com' 
    },
  ],

})
