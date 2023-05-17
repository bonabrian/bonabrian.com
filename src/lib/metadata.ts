import type { Metadata } from 'next'

import { getBaseUrl, unique } from './utils'

interface Robots {
  index?: boolean
  follow?: boolean
  noarchive?: boolean
  nosnippet?: boolean
  noimageindex?: boolean
  nocache?: boolean
  notranslate?: boolean
  'max-video-preview'?: number | string
  'max-image-preview'?: 'none' | 'standard' | 'large'
  'max-snippet'?: number
}

interface OpenGraph {
  type?: string
  siteName?: string
  title?: string
  description?: string
  url?: string
  publishedTime?: string
  images?: string
}

interface MetadataProps {
  title?: string
  description?: string
  keywords?: null | string | Array<string>
  robots?: Robots
  openGraph?: OpenGraph
}

export const defaultMetadata = {
  applicationName: "bonabrian's portfolio",
  title: 'Full-stack Engineer',
  titleTemplate: '%s | Bona Brian Siagian',
  description:
    'Passionate Full-stack engineer who focused on solving problems with digital products.',
  author: {
    name: 'Bona Brian Siagian',
    url: 'https://bonabrian.com',
    email: 'bonabriansiagian@gmail.com',
    github: 'https://github.com/bonabrian',
    linkedin: 'https://www.linkedin.com/in/bonabrian',
    avatar:
      'https://res.cloudinary.com/bonabrian/image/upload/v1675009995/avatar_davtqo.png',
  },
  keywords: [
    'bonabrian',
    'Bona Brian Siagian',
    'developer',
    'portfolio',
    'developer portfolio website',
    'portfolio website',
    'full-stack',
    'back-end',
    'front-end',
  ],
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    site: '@bonabrian_',
    creator: '@bonabrian_',
  },
}

const mapKeywords = (keywords?: null | string | Array<string>): string => {
  if (!keywords) return ''
  if (Array.isArray(keywords)) {
    return unique(keywords || []).join(',')
  }

  return keywords
}

export const getMetadata = ({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  keywords = defaultMetadata.keywords,
  robots = defaultMetadata.robots,
  openGraph,
}: MetadataProps = {}): Metadata => {
  const baseUrl = getBaseUrl()
  const metadataBase = new URL(baseUrl)

  const updatedTitle = defaultMetadata.titleTemplate.replace(/%s/g, title)
  const ogImage = openGraph?.images

  const images = `${baseUrl}/api/og?title=${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(description)}${
    ogImage ? `&image=${ogImage}` : ''
  }`

  const updatedOpenGraph: OpenGraph = {
    siteName: openGraph?.siteName ?? defaultMetadata.applicationName,
    title: openGraph?.title ?? updatedTitle,
    description: openGraph?.description ?? description,
    url: openGraph?.url ?? `${metadataBase.origin}${metadataBase.pathname}`,
    images,
  }

  return {
    metadataBase,
    title: updatedTitle,
    description,
    applicationName: defaultMetadata.applicationName,
    authors: {
      url: defaultMetadata.author.url,
      name: defaultMetadata.author.name,
    },
    keywords: mapKeywords(keywords),
    viewport: {
      initialScale: 1,
      minimumScale: 1,
      maximumScale: 5,
      userScalable: true,
      width: 'device-width',
    },
    robots,
    openGraph: {
      ...openGraph,
      ...updatedOpenGraph,
    },
    twitter: {
      title: updatedTitle,
      description,
      card: 'summary_large_image',
      site: defaultMetadata.twitter.site,
      creator: defaultMetadata.twitter.creator,
      images,
    },
  }
}
