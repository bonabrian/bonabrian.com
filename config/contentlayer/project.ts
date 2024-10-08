import type { ComputedFields } from 'contentlayer2/source-files';
import { defineDocumentType } from 'contentlayer2/source-files';
import readingTime from 'reading-time';

import { getContentImagePath } from '../../lib/utils';
import { getBlurData } from '../rehype/blur';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  image: {
    type: 'string',
    resolve: (doc) => getContentImagePath('projects', doc.image),
  },
  imageMeta: {
    type: 'json',
    resolve: async (doc) =>
      await getBlurData(getContentImagePath('projects', doc.image)),
  },
};

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
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
}));

export default Project;
