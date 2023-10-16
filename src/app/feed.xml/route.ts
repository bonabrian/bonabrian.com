import { allPosts } from 'contentlayer/generated'
import { NextResponse } from 'next/server'
import RSS from 'rss'

import { BASE_URL, ROUTES, siteConfig } from '@/data/app'

export const GET = () => {
  const feed = new RSS({
    title: siteConfig.author.name,
    description: siteConfig.description,
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.xml`,
    image_url: `${BASE_URL}/static/images/logo.svg`,
  })

  allPosts
    .filter((post) => post.published)
    .map(({ title, longExcerpt, excerpt, slug, date }) => {
      feed.item({
        title,
        description: longExcerpt ?? excerpt,
        url: `${BASE_URL}${ROUTES.blog}/${slug}`,
        date,
        author: siteConfig.author.name,
      })
    })

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
