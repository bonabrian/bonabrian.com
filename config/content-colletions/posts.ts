import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import readingTime from 'reading-time';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';
import { getBlurData } from '../mdx-plugins/remark/blur';
import { getContentImagePath, getPostExcerpt } from './utils';

const posts = defineCollection({
  name: 'Post',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    image: z.string(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    published: z.boolean().default(false),
    date: z.string().datetime(),
    modifiedDate: z.string().datetime(),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
  }),
  transform: (doc, context) => {
    return context.cache(
      {
        type: 'posts',
        doc,
      },
      async () => {
        const code = await compileMDX(
          {
            ...context,
            cache: async (input, fn) => fn(input),
          },
          doc,
          {
            cwd: process.cwd(),
            rehypePlugins,
            remarkPlugins,
          },
        );

        const { text: parsedReadingTime } = readingTime(doc.content);

        const excerpt = getPostExcerpt({
          content: doc.content,
          defaultExcerpt: doc.excerpt ?? doc.description,
          trimLength: true,
        });

        const longExcerpt = getPostExcerpt({
          content: doc.content,
          defaultExcerpt: doc.excerpt ?? doc.description,
        });

        const image = getContentImagePath('blog', doc.image);
        const imageMeta = await getBlurData(
          getContentImagePath('blog', doc.image),
        );

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug: doc._meta.path,
          readingTime: parsedReadingTime,
          code,
          excerpt,
          longExcerpt,
          image,
          imageMeta: JSON.stringify(imageMeta),
        };
      },
    );
  },
});

export default posts;
