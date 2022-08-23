import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

import { excerptText, randomize, unique } from '../src/utils'
import { getBlurData } from './image-metadata'

const chars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')

const generateRandomId = (length: number = 6) => {
  let retVal = ''
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; ++i) {
    retVal += randomize(chars)
  }
  return retVal
}

const getActualHeroUrl = (hero?: string) =>
  hero ? (hero.startsWith('http') ? hero : `/static/blog/${hero}`) : ''

const secretId = generateRandomId()

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => {
      // eslint-disable-next-line no-underscore-dangle
      const defaultSlug = doc._raw.sourceFileName.replace(/\.mdx$/, '')
      if (!doc.draft) return defaultSlug

      const secretSlug = `${defaultSlug}-${secretId}`
      return secretSlug
    },
  },
  hero: {
    type: 'string',
    resolve: (doc) => getActualHeroUrl(doc.hero),
  },
  keywords: {
    type: 'list',
    resolve: (doc) => {
      const docKeywords: Array<string> = (doc?.keywords ?? '') || ''
      return unique([...docKeywords])
    },
  },
  tags: {
    type: 'list',
    resolve: (doc) => {
      const docTags: Array<string> = (doc?.tags ?? []) || []
      return unique([...docTags])
    },
  },
  excerpt: {
    type: 'string',
    resolve: (doc) =>
      excerptText(doc.body.raw, doc.excerpt || doc.description, true),
  },
  heroMeta: {
    type: 'json',
    resolve: async (doc) => getBlurData(getActualHeroUrl(doc.hero)),
  },
}

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    excerpt: { type: 'string' },
    keywords: { type: 'list', of: { type: 'string' } },
    tags: { type: 'list', of: { type: 'string' } },
    hero: { type: 'string' },
    heroMeta: { type: 'json' },
    draft: { type: 'boolean', default: false },
  },
  computedFields,
}))

export default Post
