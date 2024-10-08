import type { ComputedFields } from 'contentlayer2/source-files';
import { defineDocumentType } from 'contentlayer2/source-files';
import readingTime from 'reading-time';
import removeMd from 'remove-markdown';

import { getContentImagePath } from '../../lib/utils';
import { getBlurData } from '../rehype/blur';

const getPostExcerpt = ({
  content,
  defaultExcerpt,
  trimLength,
  min = 70,
  max = 150,
}: {
  content?: string | null;
  defaultExcerpt?: string;
  trimLength?: boolean;
  min?: number;
  max?: number;
}): string => {
  if (defaultExcerpt) return defaultExcerpt;

  if (!content) return defaultExcerpt ?? '';

  const text = content
    .split(/\r?\n/g) // Split lines for both \n and \r\n
    .filter((line) => !line.startsWith('#')) // Filter lines starting with '#'
    .map((line) => removeMd(line.trim(), { gfm: true, useImgAltText: true })) // Remove Markdown and trim
    .filter(Boolean);

  let excerpt = '';

  if (text) {
    let lastIndex = 0;
    while (excerpt.length < max) {
      excerpt += `${text[lastIndex]}`;
      lastIndex += 1;
    }
  }

  if (trimLength) {
    const allWords = excerpt.split(' ');
    excerpt = '';
    let lastIndex = 0;
    while (excerpt.length < max) {
      const word = allWords[lastIndex];
      excerpt += `${word} `;

      if (word.endsWith('.') && !word.endsWith('etc.') && excerpt.length > min)
        break;
      lastIndex += 1;
    }
  }

  excerpt = excerpt.trim();

  if (excerpt.length > 0)
    return `${excerpt}${excerpt.endsWith('.') ? '..' : '...'}`;

  return defaultExcerpt ?? '';
};

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  image: {
    type: 'string',
    resolve: (doc) => getContentImagePath('blog', doc.image),
  },
  keywords: {
    type: 'list',
    resolve: (doc) => doc?.keywords ?? [],
  },
  excerpt: {
    type: 'string',
    resolve: (doc) =>
      getPostExcerpt({
        content: doc.body.raw,
        defaultExcerpt: doc.excerpt || doc.description,
        trimLength: true,
      }),
  },
  longExcerpt: {
    type: 'string',
    resolve: (doc) =>
      getPostExcerpt({
        content: doc.body.raw,
        defaultExcerpt: doc.excerpt || doc.description,
      }),
  },
  tags: {
    type: 'list',
    resolve: (doc) => doc?.tags ?? [],
  },
  imageMeta: {
    type: 'json',
    resolve: async (doc) =>
      await getBlurData(getContentImagePath('blog', doc.image)),
  },
};

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    modifiedDate: { type: 'date', required: true },
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
}));

export default Post;
