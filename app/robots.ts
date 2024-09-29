import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/constants';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/404', '/500', '/resume', '/api/*'],
    },
  ],
  sitemap: `${BASE_URL}/sitemap.xml`,
  host: BASE_URL,
});

export default robots;
