import type { MDXOptions } from 'contentlayer/core'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { prettyCode } from './rehype/code'
import imageBlurMetadata from './rehype/image-metadata'

const mdx: MDXOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    imageBlurMetadata,
    rehypeSlug,
    // @ts-expect-error idk
    prettyCode,
    rehypeAccessibleEmojis,
  ],
}

export default mdx
