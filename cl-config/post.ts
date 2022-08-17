import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

import { randomize, unique } from '../src/utils'

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

const secretId = generateRandomId()

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => {
      // eslint-disable-next-line no-underscore-dangle
      const defaultSlug = doc._raw.sourceFileName.replace(/\.mdx$/, '')
      const secretSlug = `${defaultSlug}-${secretId}`

      return secretSlug
    },
  },
  keywords: {
    type: 'list',
    resolve: (doc) => {
      const docKeywords: string = (doc?.keywords ?? '') || ''
      let filteredKeywords: Array<string> = []
      try {
        filteredKeywords = docKeywords
          ?.split('')
          ?.map((it: string) => it.trim())
          ?.filter((it: string) => it.length > 0)
      } catch (e) {
        filteredKeywords = []
      }

      return unique([...filteredKeywords])
    },
  },
}

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
  },
  computedFields,
}))

export default Post
