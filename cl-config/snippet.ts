import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    // eslint-disable-next-line no-underscore-dangle
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
}

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'string', required: true },
    published: { type: 'boolean', default: true },
    stacks: { type: 'list', of: { type: 'string' } },
  },
  computedFields,
}))

export default Snippet
