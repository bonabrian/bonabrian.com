import GithubSlugger from 'github-slugger'
import { toString } from 'hast-util-to-string'
import type { Pluggable } from 'unified'
import type { Parent } from 'unist'
import { visit } from 'unist-util-visit'

const remarkTocHeadings = (options: any): Pluggable => {
  return (tree: Parent) =>
    visit(tree, 'heading', (node) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: `#${GithubSlugger.slug(textContent)}`,
        depth: (node as any).depth,
      })
    })
}

export default remarkTocHeadings
