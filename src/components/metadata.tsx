import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useDarkTheme } from '@/hooks'
import { unique } from '@/lib/utils'

type OpenGraphType = 'website' | 'article'

interface OpenGraphMetadata {
  type?: OpenGraphType
  siteName?: string
  title?: string
  description?: string
  url?: string
  publishedTime?: string
  image?: string
}

type TwitterCard = 'summary' | 'summary_large_image'

interface TwitterMetadata {
  card?: TwitterCard
  site?: string
  creator?: string
  title?: string
  description?: string
  image?: string
}

interface ThemeColorMeta {
  color?: string
  schema?: string
}

interface MetadataProps {
  title?: string
  description?: string
  keywords?: string | Array<string> | null
  openGraph?: OpenGraphMetadata
  twitter?: TwitterMetadata
}

const isDevelopment = process.env.NODE_ENV === 'development'

export const defaultMetadata = {
  applicationName: "bonabrian's portfolio",
  title: 'Full-stack Engineer',
  titleTemplate: '%s | Bona Brian Siagian',
  description:
    'Passionate Full-stack engineer who focused on solving problems with digital products.',
  author: {
    name: 'Bona Brian Siagian',
    email: 'bonabriansiagian@gmail.com',
    github: 'https://github.com/bonabrian',
    linkedin: 'https://www.linkedin.com/in/bonabrian',
    avatar:
      'https://res.cloudinary.com/bonabrian/image/upload/v1675009995/avatar_davtqo.png',
  },
  siteUrl: isDevelopment ? 'http://localhost:3000' : 'https://bonabrian.com',
  themeColor: 'dark',
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
  twitter: {
    site: '@bonabrian_',
    creator: '@bonabrian_',
  },
}

const mapKeywords = (keywords?: string | Array<string> | null): string => {
  if (!keywords) return ''
  if (Array.isArray(keywords)) {
    return unique(keywords || []).join(', ')
  }

  return keywords
}

export const Metadata = ({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  keywords: initialKeywords = defaultMetadata.keywords,
  openGraph,
  twitter,
}: MetadataProps) => {
  const router = useRouter()
  const updatedTitle = defaultMetadata.titleTemplate.replace(/%s/g, title)

  const keywords = useMemo<string>(() => {
    return mapKeywords(initialKeywords)
  }, [initialKeywords])

  const { isDark, mounted } = useDarkTheme()
  const { color, schema } = useMemo<ThemeColorMeta>(() => {
    if (!mounted || !isDark) {
      return { color: '#ffffff', schema: '(prefers-color-scheme: light)' }
    }
    return { color: '#000000', schema: '(prefers-color-scheme: dark)' }
  }, [mounted, isDark])

  const url = `${defaultMetadata.siteUrl}${router.asPath}`

  const actualImage = useMemo<string | undefined>(
    () => openGraph?.image,
    [openGraph?.image],
  )

  const imageUrl = `${
    defaultMetadata.siteUrl
  }/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(
    description,
  )}${openGraph?.type === 'article' ? '&article' : ''}${
    actualImage ? `&image=${actualImage}` : ''
  }`

  return (
    <Head>
      <title key="title">{updatedTitle}</title>
      <meta
        name="view"
        content="initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, width=device-width"
      />
      <meta name="title" content={updatedTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta name="theme-color" media={schema} content={color} />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="msapplication-navbutton-color" content={color} />
      <meta name="apple-mobile-web-app-status-bar-style" content={color} />

      <link rel="canonical" key="canonical" href={url} />
      <link
        rel="alternate"
        href="/feed.xml"
        type="application/rss+xml"
        title={`${defaultMetadata.author.name} (RSS)`}
      />

      <meta name="robots" content="index,follow" />

      <meta
        key="og:site_name"
        property="og:site_name"
        content={defaultMetadata.applicationName}
      />
      <meta
        key="og:type"
        property="og:type"
        content={openGraph?.type || 'website'}
      />
      <meta
        key="og:title"
        property="og:title"
        content={openGraph?.title || updatedTitle}
      />
      <meta
        key="og:description"
        property="og:description"
        content={openGraph?.description || description}
      />
      <meta key="og:url" property="og:url" content={openGraph?.url || url} />
      <meta key="og:image" property="og:image" content={imageUrl} />
      <meta
        key="og:image:secure_url"
        property="og:image:secure_url"
        content={imageUrl}
      />

      {openGraph?.type === 'article' && openGraph?.publishedTime && (
        <meta
          key="article:published_time"
          property="article:published_time"
          content={openGraph.publishedTime}
        />
      )}

      <meta
        key="twitter:card"
        name="twitter:card"
        content={twitter?.card || 'summary_large_image'}
      />
      <meta
        key="twitter:site"
        name="twitter:site"
        content={twitter?.site || defaultMetadata.twitter.site}
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitter?.creator || defaultMetadata.twitter.creator}
      />
      <meta
        key="twitter:title"
        name="twitter:title"
        content={twitter?.title || updatedTitle}
      />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={twitter?.description || description}
      />
      <meta
        key="twitter:image"
        name="twitter:image"
        content={twitter?.image || imageUrl}
      />
    </Head>
  )
}
