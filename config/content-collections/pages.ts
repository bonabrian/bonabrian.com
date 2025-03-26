import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';

const pages = defineCollection({
  name: 'Page',
  directory: 'content/pages',
  include: '**/*.mdx',
  schema: () => ({}),
  transform: (doc, context) => {
    return context.cache(
      {
        type: 'pages',
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

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug: doc._meta.path,
          code,
        };
      },
    );
  },
});

export default pages;
