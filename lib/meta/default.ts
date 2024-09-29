import type { Metadata } from 'next';

import { SITE } from '@/constants';

import { buildOgImageURL, fullURL } from './builder';

const defaultOgImage = buildOgImageURL(SITE.title, SITE.description);

export const DEFAULT_METADATA: Metadata = {
  metadataBase: fullURL(),
  applicationName: SITE.name,
  title: {
    default: SITE.title,
    template: `%s | ${SITE.title}`,
  },
  description: SITE.description,
  authors: {
    name: SITE.author.name,
    url: SITE.author.url,
  },
  keywords: SITE.keywords,
  openGraph: {
    type: 'website',
    url: fullURL().origin,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: defaultOgImage,
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    title: SITE.title,
    description: SITE.description,
    card: 'summary_large_image',
    site: SITE.author.twitter,
    creator: SITE.author.twitter,
    images: defaultOgImage,
  },
};
