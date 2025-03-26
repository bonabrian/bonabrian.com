import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import readingTime from 'reading-time';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';

const snippets = defineCollection({
  name: 'Snippet',
  directory: 'content/snippets',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string().datetime(),
    published: z.boolean().default(false),
    tags: z.array(z.string()),
  }),
  transform: (doc, context) => {
    return context.cache(
      {
        type: 'snippets',
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

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug: doc._meta.path,
          code,
          readingTime: parsedReadingTime,
        };
      },
    );
  },
});

export default snippets;
