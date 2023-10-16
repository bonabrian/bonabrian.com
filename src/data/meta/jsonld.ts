import { siteConfig } from '../app'
import { buildOgImageURL } from './builder'

interface JsonLdEntity {
  type: string
  name: string
  url?: string
}

interface JsonLdAuthor extends JsonLdEntity {}

interface JsonLdPublisher extends JsonLdEntity {}

interface JsonLd {
  title: string
  description?: string
  type?: string
  headline?: string
  datePublished?: string
  dateModified?: string
  image?: string
  url?: string
  author?: JsonLdAuthor
  publisher?: JsonLdPublisher
}

export const buildJsonLd = ({
  title,
  description,
  type = 'BlogPosting',
  headline,
  datePublished,
  dateModified,
  image,
  url,
  author = {
    type: 'Person',
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  publisher = {
    type: 'Person',
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
}: JsonLd): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    headline,
    datePublished,
    dateModified,
    description,
    image: buildOgImageURL(title, description ?? '', image),
    url,
    author,
    publisher,
  })
