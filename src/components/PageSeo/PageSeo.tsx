import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import siteMetadata from '@/data/siteMetadata'
import { useDarkTheme } from '@/hooks'
import { unique } from '@/utils'

import type { MetaColor, MetaImageStyle, SeoProps } from './types'

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
  title,
  description,
  keywords: initialKeywords = [],
  canonicalUrl,
  ogType = 'website',
  image,
  metaImageStyle = 'summary_large_image',
}: SeoProps) => {
  const router = useRouter()

  const metaTitle = title
    ? `${title} | ${siteMetadata.author}`
    : `${siteMetadata.author} | Full-stack Developer`
  const metaDescription = description || siteMetadata.description
  const keywords = useMemo<string>(() => {
    return mapKeywords(initialKeywords)
  }, [initialKeywords])
  const exactUrl = canonicalUrl || `${siteMetadata.siteUrl}${router.asPath}`

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

  const { isDark, hasMounted } = useDarkTheme()
  const { color, schema } = useMemo<MetaColor>(() => {
    if (!hasMounted || !isDark) {
      return { color: '#ffffff', schema: '(prefers-color-scheme: light)' }
    }
    return { color: '#000000', schema: '(prefers-color-scheme: dark)' }
  }, [hasMounted, isDark])

  return (
    <Head>
      <title>{metaTitle}</title>

      <meta name={'title'} content={metaTitle} />
      <meta name={'description'} content={metaDescription} />
      <meta name={'keywords'} content={keywords} />
      <meta name={'author'} content={siteMetadata.author} />

      <meta itemProp={'name'} content={metaTitle} />
      <meta itemProp={'description'} content={metaDescription} />
      <link rel={'canonical'} href={exactUrl} />

      <meta property={'og:locale'} content={'en_US'} />
      <meta property={'og:title'} content={metaTitle} />
      <meta property={'og:type'} content={ogType} />
      <meta property={'og:url'} content={exactUrl} />
      <meta property={'og:description'} content={metaDescription} />
      <meta property={'og:site_name'} content={metaTitle} />

      <meta property={'twitter:url'} name={'twitter:url'} content={exactUrl} />
      <meta
        property={'twitter:title'}
        name={'twitter:title'}
        content={metaTitle}
      />
      <meta
        property={'twitter:description'}
        name={'twitter:description'}
        content={metaDescription}
      />

      {/* image meta */}
      <meta itemProp={'image'} content={actualImage} />
      <meta property={'og:image'} content={actualImage} />

      <meta
        property={'twitter:card'}
        name={'twitter:card'}
        content={actualMetaImageStyle}
      />

      <meta
        property={'twitter:image'}
        name={'twitter:image'}
        content={actualImage}
      />

      <meta
        property={'twitter:image:src'}
        name={'twitter:image:src'}
        content={actualImage}
      />

      {/* color meta */}
      <meta name={'theme-color'} media={schema} content={color} />
      <meta name={'msapplication-TileColor'} content={color} />
      <meta name={'msapplication-navbutton-color'} content={color} />
      <meta name={'apple-mobile-web-app-status-bar-style'} content={color} />

      <meta
        name='robots'
        content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      />
    </Head>
  )
}

export default PageSeo
