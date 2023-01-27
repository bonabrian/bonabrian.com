import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

import { excerptText, unique } from '../src/utils'
import { getBlurData } from './image-metadata'

const randomize = (items: string[]): string => {
  return items[Math.floor(Math.random() * items.length)]
}

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

const getActualImageUrl = (image?: string) =>
  image
    ? image.startsWith('http')
      ? image
      : `/static/images/blog/${image}`
    : ''

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
  image: {
    type: 'string',
    resolve: (doc) => getActualImageUrl(doc.image),
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
  imageMeta: {
    type: 'json',
    resolve: async (doc) => getBlurData(getActualImageUrl(doc.image)),
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
    image: { type: 'string' },
    imageMeta: { type: 'json' },
    imageSource: { type: 'string' },
    draft: { type: 'boolean', default: false },
  },
  computedFields,
}))

export default Post
