import type { MDXOptions } from 'contentlayer/core'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { prettyCode } from './rehype/code'
import imageMetaData from './rehype/image-metadata'

const mdx: MDXOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    imageMetaData,
    rehypeSlug,
    prettyCode,
    [rehypePrism, { ignoreMissing: true }],
    rehypeAccessibleEmojis,
  ],
}

export default mdx
