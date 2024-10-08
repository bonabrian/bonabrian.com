import type { MDXOptions } from 'contentlayer2/core';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { imageBlurMetadata } from '../rehype/blur';
import { prettyCode } from '../rehype/code';

const mdx: MDXOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    imageBlurMetadata,
    rehypeSlug,
    // @ts-expect-error idk
    prettyCode,
    rehypeAccessibleEmojis,
  ],
};

export default mdx;
