import type { Metadata } from 'next';

import { buildOgImageURL } from './builder';
import { DEFAULT_METADATA } from './default';

type SeoProps = Metadata & {
  url?: string | URL;
  date?: string;
};

/**
 * Helper method to deep merge the SEO params from a given page
 * with the default SEO params.
 *
 * This method also will use title and description in the OpenGraph and
 * Twitter metadata, if not set
 */
export const seo = ({ url, date, ...metadata }: SeoProps = {}): Metadata => {
  const title = metadata.title ?? DEFAULT_METADATA.title;
  const description = metadata.description ?? DEFAULT_METADATA.description;

  metadata.keywords = metadata.keywords ?? DEFAULT_METADATA.keywords;

  const ogImage = buildOgImageURL(title as string, description as string, date);

  metadata.openGraph = {
    title: title ?? undefined,
    description: description ?? undefined,
    images: ogImage,
    ...metadata.openGraph,
  };

  metadata.twitter = {
    title: title ?? undefined,
    description: description ?? undefined,
    images: ogImage,
    ...metadata.twitter,
  };

  if (url) {
    metadata.openGraph.url = url;
    metadata.alternates = {
      canonical: url,
      ...metadata.alternates,
    };
  }

  return {
    ...DEFAULT_METADATA,
    ...metadata,
  };
};
