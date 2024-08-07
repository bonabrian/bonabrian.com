import {
  type ComputedFields,
  defineDocumentType,
} from 'contentlayer/source-files'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  tags: {
    type: 'list',
    resolve: (doc) => doc?.tags ?? [],
  },
}

const TIL = defineDocumentType(() => ({
  name: 'TIL',
  filePathPattern: 'til/*.mdx',
  contentType: 'mdx',
  fields: {
    date: { type: 'string', required: true },
  },
  computedFields,
}))

export default TIL
