import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { siteMetaData } from '@/data'
import { useDarkTheme } from '@/hooks'
import { unique } from '@/lib/utils'

type OpenGraph = 'website' | 'article'

type MetaImageStyle = 'summary_large_image' | 'summary'
type MetaColor = {
  color?: string
  schema?: string
}

interface SeoProps {
  title?: string
  description?: string
  keywords?: string | Array<string> | null
  canonical?: string
  ogType?: OpenGraph
  image?: string
  metaImageStyle?: MetaImageStyle
}

// TODO: add logo
const defaultImage = 'placeholder'
const defaultLogoImage = 'logo'

const mapKeywords = (keywords?: string | Array<string> | null): string => {
  if (!keywords) return ''
  if (Array.isArray(keywords)) {
    return unique(keywords || []).join(', ')
  }

  return keywords
}

const PageSeo = ({
  title: titleProp,
  description,
  keywords: initialKeywords = [],
  canonical,
  ogType = 'website',
  image,
  metaImageStyle = 'summary_large_image',
}: SeoProps) => {
  const router = useRouter()

  const titleTemplate = titleProp
    ? siteMetaData.title.replace('%s', titleProp)
    : siteMetaData.defaultTitle

  const metaDescription = description || siteMetaData.description
  const keywords = useMemo<string>(() => {
    return mapKeywords(initialKeywords)
  }, [initialKeywords])
  const canonicalUrl = canonical || `${siteMetaData.canonical}${router.asPath}`

  const actualDefaultImage = useMemo<string>(
    () => (metaImageStyle === 'summary' ? defaultLogoImage : defaultImage),
    [metaImageStyle],
  )

  const actualImage = useMemo<string>(
    () => image || actualDefaultImage,
    [image, actualDefaultImage],
  )

  const actualMetaImageStyle = useMemo<MetaImageStyle>(
    () =>
      actualImage === defaultLogoImage
        ? 'summary'
        : metaImageStyle || 'summary_large_image',
    [actualImage, metaImageStyle],
  )

  const isArticle = ogType === 'article'
  const imageSource = `${
    siteMetaData.siteUrl
  }/api/og?title=${encodeURIComponent(titleProp || '')}${
    isArticle ? '&article' : ''
  }${
    actualImage ? `&imageSource=${actualImage}` : ''
  }&description=${encodeURIComponent(metaDescription)}`

  const { isDark, mounted } = useDarkTheme()
  const { color, schema } = useMemo<MetaColor>(() => {
    if (!mounted || !isDark) {
      return { color: '#ffffff', schema: '(prefers-color-scheme: light)' }
    }
    return { color: '#000000', schema: '(prefers-color-scheme: dark)' }
  }, [mounted, isDark])

  return (
    <Head>
      <title>{titleTemplate}</title>

      <meta name="title" content={titleTemplate} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteMetaData.author} />

      <meta itemProp="name" content={titleTemplate} />
      <meta itemProp="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={titleTemplate} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={titleTemplate} />

      <meta property="twitter:url" name="twitter:url" content={canonicalUrl} />
      <meta
        property="twitter:title"
        name="twitter:title"
        content={titleTemplate}
      />
      <meta
        property="twitter:description"
        name="twitter:description"
        content={metaDescription}
      />

      {/* image meta */}
      <meta itemProp="image" content={imageSource} />
      <meta property="og:image" content={imageSource} />

      <meta
        property="twitter:card"
        name="twitter:card"
        content={actualMetaImageStyle}
      />

      <meta
        property="twitter:image"
        name="twitter:image"
        content={imageSource}
      />

      <meta
        property="twitter:image:src"
        name="twitter:image:src"
        content={imageSource}
      />

      {/* color meta */}
      <meta name="theme-color" media={schema} content={color} />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="msapplication-navbutton-color" content={color} />
      <meta name="apple-mobile-web-app-status-bar-style" content={color} />

      <meta name="robots" content={siteMetaData.robots} />

      <link
        rel="alternate"
        href="/feed.xml"
        type="application/rss+xml"
        title={`${siteMetaData.author} (RSS)`}
      />
    </Head>
  )
}

export default PageSeo
