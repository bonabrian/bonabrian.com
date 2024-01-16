import type { MetadataRoute } from 'next'

import { BASE_URL } from '@/config/site'

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/404', '/500', '/api/*'],
    },
  ],
  sitemap: `${BASE_URL}/sitemap.xml`,
  host: BASE_URL,
})

export default robots
