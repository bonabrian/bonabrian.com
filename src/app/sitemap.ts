import { allNotes, allPosts, allProjects } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'

import { BASE_URL, ROUTES } from '@/data/app'

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
      lastModified: post.date.split('T')[0],
    }))

  const notes = allNotes
    .filter((note) => note.published)
    .map((note) => ({
      url: `${BASE_URL}${ROUTES.notes}/${note.slug}`,
      lastModified: note.date.split('T')[0],
    }))

  const routes = [
    '',
    ROUTES.blog,
    ROUTES.projects,
    ROUTES.notes,
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

  return [...routes, ...posts, ...notes]
}

export default sitemap
