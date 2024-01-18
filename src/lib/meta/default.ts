import type { Metadata } from 'next'

import site from '@/config/site'

import { buildOgImageURL, fullURL } from './builder'

const defaultOgImage = buildOgImageURL(site.title, site.description)

export const DEFAULT_METADATA: Metadata = {
  metadataBase: fullURL(),
  applicationName: site.name,
  title: {
    default: site.title,
    template: `%s | ${site.title}`,
  },
  description: site.description,
  authors: {
    name: site.author.name,
    url: site.author.url,
  },
  keywords: site.keywords,
  openGraph: {
    type: 'website',
    url: fullURL().origin,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: defaultOgImage,
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    title: site.title,
    description: site.description,
    card: 'summary_large_image',
    site: site.author.twitter,
    creator: site.author.twitter,
    images: defaultOgImage,
  },
}
