import type { MDXOptions } from 'contentlayer/core'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import imageMetaData from './image-metadata'

const mdx: MDXOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    imageMetaData,
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: {
          dark: 'github-dark',
          light: 'github-light',
        },
        tokensMap: {
          // VScode command palette: Inspect Editor Tokens and Scopes
          // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
          fn: 'entity.name.function',
          objKey: 'meta.object-literal.key',
        },
        onVisitLine(node: any) {
          if (!node) return
          // Prevent lines from collapsing in `display: grid` mode, and
          // allow empty lines to be copy/pasted
          if (node.children.length === 0) {
            // eslint-disable-next-line no-param-reassign
            node.children = [{ type: 'text', value: ' ' }]
          }
        },
        // Feel free to add classNames that suit your docs
        onVisitHighlightedLine(node: any) {
          if (!node) return
          node.properties.className.push('line--highlighted')
        },
        onVisitHighlightedWord(node: any) {
          if (!node) return
          // eslint-disable-next-line no-param-reassign
          node.properties.className = ['word']
        },
      },
    ],
    [rehypePrism, { ignoreMissing: true }],
    rehypeAccessibleEmojis,
  ],
}

export default mdx
