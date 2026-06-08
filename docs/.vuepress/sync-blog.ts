import fs from 'fs'
import path from 'path'


/**
 * 【Feature：笔记自动同步为博客】
 * 扫描文档目录下 Frontmatter 中包含 `blog: true` 或 `isBlog: true` 的所有笔记，
 * 在 `docs/blog/auto-generated/<year>/` 目录下生成对应的占位（Stub）博客文章。
 * 
 * 占位文章使用 VuePress 的 `@include` 引入原笔记内容，并在客户端通过脚本重定向至原笔记的 permalink，
 * 从而既能在博客时间轴中展示这些笔记，又不会造成内容重复维护。
 * 
 * ====================================================================
 * 支持在原笔记 Frontmatter 中配置的元数据标签：
 * ====================================================================
 * - blog: true 或 isBlog: true
 *   标记当前笔记需要同步发布为博客。
 * 
 * - blogTitle: string (可选)
 *   自定义博客标题。如果存在，会在自动生成的博客中以 blogTitle 覆盖掉 original title，
 *   从而实现“笔记标题较简短、博客标题更完整”的需求。
 * 
 * - blogExcerpt: string (可选)
 *   博客文章的摘要。生成器会将其映射为博客的 `excerpt` 标签。
 * 
 * - blogCover: string (可选)
 *   博客文章的封面图路径。生成器会将其映射为博客的 `cover` 标签。
 * 
 * - tags / categories (可选)
 *   直接读取并继承自原笔记的标签和分类列表。
 * 
 * ====================================================================
 * 自动化机制设计特点：
 * ====================================================================
 * 1. 通过 `.gitignore` 过滤 `docs/blog/auto-generated/` 目录，避免污染
 * 2. 生成器自动提取 `createTime` 中的年份，并输出在对应年份的文件夹内（如 `/2026/`），
 *    再配合 `config.ts` 中的 `categoriesTransform` 自动过滤 `auto-generated` 分类名，
 *    使得博客分类和时间轴能够完美合并到原生的年份分类中。
 * 3. 重定向：Stub 占位文件底部会自动植入 `<script setup>` 路由控制代码，
 *    在博客流中点击文章时，会跳转至笔记的真实 URL。
 */


// 递归遍历 Markdown 文件
function getMdFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      const baseName = path.basename(filePath)
      // 忽略不需要扫描的目录
      if (['node_modules', '.vuepress', 'blog', 'public', '.git', 'dist'].includes(baseName)) {
        continue
      }
      getMdFiles(filePath, fileList)
    } else if (filePath.endsWith('.md') && !file.toLowerCase().endsWith('readme.md')) {
      fileList.push(filePath)
    }
  }
  return fileList
}

// 格式化时间助手
function formatFileDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export function syncNotesToBlog(docsDir: string) {
  const autoGenDir = path.join(docsDir, 'blog', 'auto-generated')

  // 1. 每次构建前清空并重新创建 auto-generated 文件夹
  if (fs.existsSync(autoGenDir)) {
    fs.rmSync(autoGenDir, { recursive: true, force: true })
  }
  fs.mkdirSync(autoGenDir, { recursive: true })

  // 2. 扫描所有非 blog 文件夹的 markdown 文件
  const files = getMdFiles(docsDir)

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8')
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!match) continue

    const frontmatterText = match[1]

    // 检查元数据是否包含 blog: true 或 isBlog: true
    const isBlogMatch = frontmatterText.match(/(?:^|\n)(isBlog|blog)\s*:\s*(true|yes|on)\b/)
    if (!isBlogMatch) continue

    // 提取主要属性
    const titleMatch = frontmatterText.match(/(?:^|\n)title\s*:\s*(["']?)(.*?)\1\s*(?:\n|$)/)
    const blogTitleMatch = frontmatterText.match(/(?:^|\n)blogTitle\s*:\s*(["']?)(.*?)\1\s*(?:\n|$)/)
    const createTimeMatch = frontmatterText.match(/(?:^|\n)createTime\s*:\s*(["']?)(.*?)\1\s*(?:\n|$)/)
    const tagsMatch = frontmatterText.match(/(?:^|\n)tags\s*:\s*(.*)/)
    const categoriesMatch = frontmatterText.match(/(?:^|\n)categories\s*:\s*(.*)/)
    const blogExcerptMatch = frontmatterText.match(/(?:^|\n)blogExcerpt\s*:\s*(["']?)(.*?)\1\s*(?:\n|$)/)
    const blogCoverMatch = frontmatterText.match(/(?:^|\n)blogCover\s*:\s*(["']?)(.*?)\1\s*(?:\n|$)/)

    // 如果指定了 blogTitle 则优先使用 blogTitle，否则使用 title
    const title = blogTitleMatch ? blogTitleMatch[2] : (titleMatch ? titleMatch[2] : path.basename(file, '.md'))
    const createTime = createTimeMatch ? createTimeMatch[2] : formatFileDate(fs.statSync(file).birthtime)

    // 从 createTime 中提取年份
    const yearMatch = createTime.match(/^(\d{4})/)
    const year = yearMatch ? yearMatch[1] : new Date().getFullYear().toString()

    let stubFrontmatter = `title: "${title.replace(/"/g, '\\"')}"\ncreateTime: ${createTime}`

    // 提取或确定原始的 permalink 路径，供跳转使用
    const originalPermalinkMatch = frontmatterText.match(/(?:^|\n)permalink\s*:\s*(["']?)(.*?)\1\s*(?:\n|$)/)
    const originalPermalink = originalPermalinkMatch
      ? originalPermalinkMatch[2]
      : `/notes/${path.basename(file, '.md')}/` // 降级兜底

    // 确定 stub 博客占位路由，确保其不与笔记路由产生物理冲突
    if (originalPermalinkMatch) {
      const origLink = originalPermalinkMatch[2]
      const cleanLinkName = origLink.replace(/^\/(notes|knowledges|sentences|crash-course)\//, '').replace(/\/$/, '')
      stubFrontmatter += `\npermalink: /blog/post/${cleanLinkName || path.basename(file, '.md')}/`
    } else {
      stubFrontmatter += `\npermalink: /blog/post/${path.basename(file, '.md')}/`
    }

    if (tagsMatch) stubFrontmatter += `\ntags: ${tagsMatch[1]}`
    if (categoriesMatch) stubFrontmatter += `\ncategories: ${categoriesMatch[1]}`
    if (blogExcerptMatch) stubFrontmatter += `\nexcerpt: "${blogExcerptMatch[2].replace(/"/g, '\\"')}"`
    if (blogCoverMatch) stubFrontmatter += `\ncover: "${blogCoverMatch[2].replace(/"/g, '\\"')}"`

    stubFrontmatter += `\nautoGenerated: true`

    // 创建对应年份子目录，使 Plume 能够基于物理目录归入年份二级分类
    const stubYearDir = path.join(autoGenDir, year)
    if (!fs.existsSync(stubYearDir)) {
      fs.mkdirSync(stubYearDir, { recursive: true })
    }

    // 计算生成文件对原笔记文件的相对路径
    const relativePathToDoc = path.relative(stubYearDir, file).replace(/\\/g, '/')

    // 生成 Stub 文件内容，同时追加客户端跳转脚本，无缝直连原笔记 URL
    const stubContent = `---
${stubFrontmatter}
---

<!-- @include: ${relativePathToDoc} -->

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vuepress/client'

onMounted(() => {
  useRouter().replace('${originalPermalink}')
})
</script>
`

    // 生成唯一且安全的文件名（使用扁平化路径防止同名冲突）
    const safeFilename = path.relative(docsDir, file)
      .replace(/\\/g, '-')
      .replace(/\//g, '-')
      .replace(/\.md$/, '') + '.md'

    fs.writeFileSync(path.join(stubYearDir, safeFilename), stubContent, 'utf-8')
  }

  // 3. 在开发环境下启动目录监听，实现文件改动自动重新同步生成
  const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('dev') || process.argv.includes('docs:dev')
  if (!isWatching && isDev) {
    isWatching = true
    startWatcher(docsDir)
    console.log('[sync-blog] 成功启动开发环境下笔记改动监听器。')
  }
}

let isWatching = false
let debounceTimer: NodeJS.Timeout | null = null

function startWatcher(docsDir: string) {
  fs.watch(docsDir, { recursive: true }, (eventType, filename) => {
    if (!filename) return
    const normalized = filename.replace(/\\/g, '/')
    
    // 过滤掉整个 blog 目录、.vuepress 目录、node_modules 等，防止循环触发及无谓开销
    if (
      normalized.startsWith('blog/') || 
      normalized.includes('.vuepress') || 
      normalized.includes('node_modules') || 
      normalized.includes('.git')
    ) {
      return
    }

    if (normalized.endsWith('.md')) {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        console.log(`[sync-blog] 监测到笔记文件 ${normalized} 发生改动，正在重新同步博客...`)
        syncNotesToBlog(docsDir)
      }, 300)
    }
  })
}
