import { allPosts, allProjects, allSnippets } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'

import { BASE_URL, ROUTES } from '@/data/app'

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
      lastModified: post.date.split('T')[0],
    }))

  const snippets = allSnippets
    .filter((snippet) => snippet.published)
    .map((snippet) => ({
      url: `${BASE_URL}${ROUTES.snippets}/${snippet.slug}`,
      lastModified: snippet.date.split('T')[0],
    }))

  const routes = [
    '',
    ROUTES.blog,
    ROUTES.projects,
    ROUTES.snippets,
    ROUTES.guestbook,
    ROUTES.todayILearned,
    ROUTES.endorsements,
    ROUTES.dashboard,
    ROUTES.about,
    ...allProjects
      .filter((project) => project.published)
      .map((project) => `${ROUTES.projects}/${project.slug}`),
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...posts, ...snippets]
}

export default sitemap
