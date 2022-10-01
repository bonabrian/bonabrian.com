/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { writeFileSync } from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'

import { allPosts, allProjects, allSnippets } from './../.contentlayer/generated/index.mjs'

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc')

  const pages = await globby([
    'src/pages/*.ts',
    'src/pages/*.tsx',
    '!src/pages/_*.ts',
    '!src/pages/_*.tsx',
    '!src/pages/404.tsx',
    '!src/pages/500.tsx',
    '!src/pages/api',
    'data/**/*.mdx',
    '!data/*.mdx',
  ])

  const actualRoutes = []

  pages.forEach((page) => {
    const path = page
      .replace('src/', '')
      .replace('pages', '')
      .replace('data', '')
      .replace('.jsx', '')
      .replace('.tsx', '')
      .replace('.mdx', '')
      .replace('.js', '')
      .replace('.ts', '')
      .replace('.md', '')

    if (path === '/index') {
      actualRoutes.splice(0, 0, '/')
    } else {
      actualRoutes.push(path)
    }
  })

  actualRoutes.push('/feed')

  const tags = []
  const postsRoutes = await Promise.all(
    allPosts.filter((it) => !it.draft).map((it) => {
      it.tags?.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
        return tags
      })
      return `/blog/${it.slug}`
    }),
  )

  const tagsRoutes = tags.map((tag) => `/tags/${tag}`)

  const projectsRoutes = await Promise.all(
    allProjects.filter((it) => !it.draft).map((it) => `/projects/${it.slug}`),
  )

  const snippetsRoutes = await Promise.all(
    allSnippets.map((it) => `/snippets/${it.slug}`),
  )

  const now = new Date().toISOString()
  const lastmod = `${now.substring(0, now.lastIndexOf('.'))}+00:00`
  const xmlRoutes = [
    ...actualRoutes,
    ...postsRoutes,
    ...tagsRoutes,
    ...projectsRoutes,
    ...snippetsRoutes,
  ]
    .map((route) => {
      const slashCount = (route.match(/\//g) || []).length
      let priority = 1 - 0.2 * slashCount
      if (route.length <= 1 || priority > 1.0) priority = 1.0
      if (priority < 0.2) priority = 0.2

      return `<url>
        <loc>${`https://bonabrian.com${route}`}</loc>
        <lastmod>${lastmod}</lastmod>
        <priority>${priority}</priority>
      </url>`
    })
    .join('\n')

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${xmlRoutes}</urlset>
  `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  writeFileSync('./public/sitemap.xml', formatted)
})()
