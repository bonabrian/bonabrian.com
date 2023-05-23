import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import removeMarkdown from 'remove-markdown'

import { getBlurData } from './image-metadata'

const getPostExcerpt = (
  content?: string | null,
  defaultExcerpt?: string | null,
  trimLength?: boolean | null,
  minCharacters: number = 70,
  maxCharacters: number = 150,
): string => {
  if (defaultExcerpt) return defaultExcerpt

  if (!content) return defaultExcerpt || ''

  const text = content
    ?.split(/[\r\n]+/gm)
    ?.filter((it: string) => !it.startsWith('#'))
    ?.join('\n')
    ?.split('\n')
    ?.map((it: string) => (it || '').trim())
    ?.filter((it: string) => it?.length)
    ?.map((it: string) =>
      removeMarkdown(it, { gfm: true, useImgAltText: true }),
    )

  let excerpt = ''
  if (text) {
    let lastIndex = 0
    while (excerpt.length < maxCharacters) {
      excerpt += `${text[lastIndex]} `
      lastIndex += 1
    }
  }

  if (trimLength) {
    const allWords = excerpt.split(' ')
    excerpt = ''
    let lastIndex = 0
    while (excerpt.length < maxCharacters) {
      const word = allWords[lastIndex]
      excerpt += `${word} `
      if (
        word.endsWith('.') &&
        !word.endsWith('etc.') &&
        excerpt.length > minCharacters
      ) {
        break
      }
      lastIndex += 1
    }
  }

  excerpt = excerpt.trim()

  if (excerpt.length > 0) {
    return `${excerpt}${excerpt.endsWith('.') ? '..' : '...'}`
  }

  return defaultExcerpt ?? ''
}

const getActualImageUrl = (image?: string) => {
  if (image) {
    return image.startsWith('http') ? image : `/static/images/blog/${image}`
  }

  return ''
}

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  image: {
    type: 'string',
    resolve: (doc) => getActualImageUrl(doc.image),
  },
  keywords: {
    type: 'list',
    resolve: (doc) => doc?.keywords ?? [],
  },
  excerpt: {
    type: 'string',
    resolve: (doc) =>
      getPostExcerpt(doc.body.raw, doc.excerpt || doc.description, true),
  },
  longExcerpt: {
    type: 'string',
    resolve: (doc) =>
      getPostExcerpt(doc.body.raw, doc.excerpt || doc.description),
  },
  tags: {
    type: 'list',
    resolve: (doc) => doc?.tags ?? [],
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
    published: { type: 'boolean', default: true },
    pinned: { type: 'boolean', default: false },
  },
  computedFields,
}))

export default Post
