import { SITE } from '@/constants';

import { buildOgImageURL } from './builder';

interface JsonLdEntity {
  type: string;
  name: string;
  url?: string;
}

type JsonLdAuthor = JsonLdEntity;

type JsonLdPublisher = JsonLdEntity;

interface JsonLd {
  title: string;
  description?: string;
  type?: string;
  headline?: string;
  datePublished?: string;
  dateModified?: string;
  url?: string;
  author?: JsonLdAuthor;
  publisher?: JsonLdPublisher;
}

export const buildJsonLd = ({
  title,
  description,
  type = 'BlogPosting',
  headline,
  datePublished,
  dateModified,
  url,
  author = {
    type: 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
  },
  publisher = {
    type: 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
  },
}: JsonLd): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    headline,
    datePublished,
    dateModified,
    description,
    image: buildOgImageURL(title, description ?? '', datePublished),
    url,
    author,
    publisher,
  });
