import type { MetadataRoute } from 'next';

import { allPosts, allProjects } from '@/.contentlayer/generated';
import { BASE_URL, ROUTES } from '@/constants';

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
      lastModified: post.date.split('T')[0],
    }));

  const routes = [
    '',
    ROUTES.blog,
    ROUTES.projects,
    // ROUTES.notes,
    ROUTES.tags,
    ROUTES.endorsements,
    ROUTES.guestbook,
    ROUTES.about,
    ROUTES.dashboard,
    ROUTES.resume,
    // ROUTES.todayILearned,
    ...allProjects
      .filter((project) => project.published)
      .map((project) => `${ROUTES.projects}/${project.slug}`),
  ].map((route) => ({
    url: `${BASE_URL}${route},`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
};

export default sitemap;
