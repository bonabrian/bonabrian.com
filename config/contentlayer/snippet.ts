import type { ComputedFields } from 'contentlayer2/source-files';
import { defineDocumentType } from 'contentlayer2/source-files';
import readingTime from 'reading-time';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
};

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    published: { type: 'boolean', default: true },
    tags: { type: 'list', of: { type: 'string' } },
  },
  computedFields,
}));

export default Snippet;
