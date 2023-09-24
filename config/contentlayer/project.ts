import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

import { getBlurData } from './rehype/image-metadata'
import { getActualImageUrl } from './utils'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    // eslint-disable-next-line no-underscore-dangle
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  image: {
    type: 'string',
    resolve: (doc) => getActualImageUrl('projects', doc.image),
  },
  imageMeta: {
    type: 'json',
    resolve: async (doc) => getBlurData(getActualImageUrl(doc.image)),
  },
}

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'string', required: true },
    published: { type: 'boolean', default: true },
    highlight: { type: 'boolean', default: false },
    stacks: { type: 'list', of: { type: 'string' } },
    image: { type: 'string' },
    imageMeta: { type: 'json' },
    url: { type: 'string' },
    repositoryUrl: { type: 'string' },
    playStoreUrl: { type: 'string' },
  },
  computedFields,
}))

export default Project
