/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { writeFileSync } from 'fs'
import xml from 'xml'

import { allPosts } from './../.contentlayer/generated/index.mjs'

const formatImageUrl = (url) => {
  if (!url) return ''
  return url.startsWith('/') ? `https://bonabrian.com${url}` : url
}

const buildDescriptionHtml = (post) => {
  let description = ''
  if (post.excerpt) {
    description += `<p>${post.excerpt}</p>`
  }

  description += `<b><a href="https://bonabrian.com/blog/${post.slug}">Read more...</a></b><br/><br/>`

  if (post.hero) {
    description += `<p><img src="${formatImageUrl(post.hero)}" alt="${post.title}"></p>`
  }

  return description
}

const getAllPostRssData = async (post) => {
  const descriptionHtml = buildDescriptionHtml(post)
  return {
    title: post.title,
    url: `https://bonabrian.com/blog/${post.slug}`,
    date: post.date,
    description: post.excerpt,
    html: descriptionHtml,
    slug: post.slug,
    hero: post.hero,
  }
}

const buildItemForFeed = (elem, parentKey = null) => {
  const newArray = []

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(elem)) {
    const value = elem[key]
    if (key === parentKey) {
      newArray.push(value)
      // eslint-disable-next-line no-continue
      continue
    }

    const newObject = {}
    if (typeof value === 'object' && Object.keys(value).length > 1) {
      newObject[key] = buildItemForFeed(value, key)
    } else {
      newObject[key] = elem[key]
    }

    newArray.push(newObject)
  }

  return newArray
}

const buildFeed = (posts) => {
  const sortedPosts = posts.sort((first, second) => {
    return new Date(second.date).getTime() - new Date(first.date).getTime()
  })
  const feedItems = []

  feedItems.push(
    ...sortedPosts.map((post) => {
      const description = post.html ? { _cdata: post.html } : post.description

      const actualItem = {
        title: post.title,
        pubDate: new Date(post.date).toUTCString(),
        url: `https://bonabrian.com/blog/${post.slug}`,
        guid: {
          _attr: { isPermaLink: true },
          guid: `https://bonabrian.com/blog/${post.slug}`,
        },
        description,
        featured_image: formatImageUrl(post.hero),
      }

      const feedItem = {
        item: buildItemForFeed(actualItem),
      }

      return feedItem
    })
  )

  return feedItems
}

const defaultChannel = {
  'atom:link': {
    _attr: {
      href: 'https://bonabrian.com/feed.xml',
      rel: 'self',
      type: 'application/rss+xml',
    },
  },
  lastBuildDate: new Date().toUTCString(),
  language: 'en-US',
  link: 'https://bonabrian.com',
  title: 'Bona Brian Siagian',
  description: 'Passionate Full-stack developer based in Jakarta',
  image: {
    title: 'Bona Brian Siagian',
    link: 'https://bonabrian.com',
    url: 'https://bonabrian.com/static/images/logo.png',
  },
  copyright: `All rights reserved ${new Date().getFullYear()}, Bona Brian Siagian`,
}

;(async () => {
  const feedItems = await Promise.all(
    allPosts.filter((it) => !it.draft).map(getAllPostRssData),
  )

  const feedObject = {
    rss: [
      {
        _attr: {
          'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
          'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
          'xmlns:atom': 'http://www.w3.org/2005/Atom',
          version: '2.0',
        },
      },
      {
        channel: [...buildItemForFeed(defaultChannel), ...buildFeed(feedItems)],
      },
    ],
  }

  const feed = xml(feedObject, { indent: true, declaration: true })
  writeFileSync('./public/feed.xml', feed)
})()
