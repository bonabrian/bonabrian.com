import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import readingTime from 'reading-time';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';
import { getBlurData } from '../mdx-plugins/remark/blur';
import { getContentImagePath } from './utils';

const projects = defineCollection({
  name: 'Project',
  directory: 'content/projects',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string().date(),
    published: z.boolean().default(false),
    highlight: z.boolean().default(false),
    stacks: z.array(z.string()).default([]),
    url: z.string().url().nullable().optional(),
    repositoryUrl: z.string().url().optional(),
    playStoreUrl: z.string().url().optional(),
    image: z.string(),
  }),
  transform: (doc, context) => {
    return context.cache(
      {
        type: 'projects',
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
        const image = getContentImagePath('projects', doc.image);
        const imageMeta = await getBlurData(
          getContentImagePath('projects', doc.image),
        );

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug: doc._meta.path,
          readingTime: parsedReadingTime,
          code,
          image,
          imageMeta: JSON.stringify(imageMeta),
        };
      },
    );
  },
});

export default projects;
