import type { Metadata } from 'next'

import { siteConfig } from '../app'
import { buildOgImageURL, fullURL, mapKeywords } from './builder'

const defaultOgImage = buildOgImageURL(siteConfig.title, siteConfig.description)

export const DEFAULT_METADATA: Metadata = {
  metadataBase: fullURL(),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  authors: {
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  keywords: mapKeywords(siteConfig.keywords),
  viewport: {
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    width: 'device-width',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: defaultOgImage,
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    title: siteConfig.title,
    description: siteConfig.description,
    card: 'summary_large_image',
    site: siteConfig.author.twitter,
    creator: siteConfig.author.twitter,
    images: defaultOgImage,
  },
}
