import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

import { getBlurData } from './image-metadata'

const getActualImageUrl = (image?: string) =>
  image
    ? image.startsWith('http')
      ? image
      : `/static/images/projects/${image}`
    : ''

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    // eslint-disable-next-line no-underscore-dangle
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  image: {
    type: 'string',
    resolve: (doc) => getActualImageUrl(doc.image),
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
    order: { type: 'number', required: true },
    image: { type: 'string' },
    imageMeta: { type: 'json' },
    draft: { type: 'boolean', default: false },
    url: { type: 'string' },
    category: { type: 'string', required: true },
  },
  computedFields,
}))

export default Project
