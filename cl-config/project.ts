import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

import { getBlurData } from './image-metadata'

const getActualHeroUrl = (hero?: string) =>
  hero
    ? hero.startsWith('http')
      ? hero
      : `/static/images/projects/${hero}`
    : ''

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    // eslint-disable-next-line no-underscore-dangle
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  hero: {
    type: 'string',
    resolve: (doc) => getActualHeroUrl(doc.hero),
  },
  heroMeta: {
    type: 'json',
    resolve: async (doc) => getBlurData(getActualHeroUrl(doc.hero)),
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
    hero: { type: 'string' },
    heroMeta: { type: 'json' },
    draft: { type: 'boolean', default: false },
    url: { type: 'string' },
  },
  computedFields,
}))

export default Project
