// import rehypeToc from '@jsdevtools/rehype-toc'
import type { MDXOptions } from 'contentlayer/core'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import imageMetaData from './image-metadata'

// interface RehypeElement {
//   type: string
//   tagName?: string
//   value?: string
//   properties?: {
//     className?: string
//   }
//   children?: Array<RehypeElement>
// }

// const customizeTOC = (toc: RehypeElement): RehypeElement | null => {
//   try {
//     const { children } = toc
//     const descendant = children?.[0]?.children
//     if (!children?.length || !descendant?.length) return null
//   } catch (error) {
//     return null
//   }

//   return {
//     type: 'element',
//     tagName: 'div',
//     properties: { className: 'toc' },
//     children: [
//       {
//         type: 'element',
//         tagName: 'p',
//         properties: { className: 'title font-medium text-lg' },
//         children: [{ type: 'text', value: 'Table of Contents' }],
//       },
//       ...(toc.children || []),
//     ],
//   }
// }

const mdx: MDXOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    imageMetaData,
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: 'one-dark-pro',
        tokensMap: {
          // VScode command palette: Inspect Editor Tokens and Scopes
          // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
          fn: 'entity.name.function',
          objKey: 'meta.object-literal.key',
        },
        onVisitLine(node: any) {
          // Prevent lines from collapsing in `display: grid` mode, and
          // allow empty lines to be copy/pasted
          if (node.children.length === 0) {
            // eslint-disable-next-line no-param-reassign
            node.children = [{ type: 'text', value: ' ' }]
          }
        },
        // Feel free to add classNames that suit your docs
        onVisitHighlightedLine(node: any) {
          node.properties.className.push('line--highlighted')
        },
        onVisitHighlightedWord(node: any) {
          // eslint-disable-next-line no-param-reassign
          node.properties.className = ['word']
        },
      },
    ],
    [rehypePrism, { ignoreMissing: true }],
    // [
    //   rehypeAutolinkHeadings,
    //   {
    //     properties: {
    //       className: ['anchor'],
    //     },
    //   },
    // ],
    // [
    //   rehypeToc,
    //   {
    //     customizeTOC,
    //   },
    // ],
    rehypeAccessibleEmojis,
  ],
}

export default mdx
