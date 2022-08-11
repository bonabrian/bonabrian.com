/* eslint-disable no-param-reassign */
import fs from 'fs'
import imageSize from 'image-size'
import type { Pluggable } from 'unified'
import { visit } from 'unist-util-visit'

const remarkImgToJsx = (): Pluggable => {
  return (tree) => {
    visit(
      tree,
      // only visit p tags that contain an img element,
      (node: any) =>
        node.type === 'paragraph' &&
        node.children.some((n: any) => n.type === 'image'),
      (node: any) => {
        const imageNode = node.children.find((n: any) => n.type === 'image')

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimension = imageSize(`${process.cwd()}/public${imageNode.url}`)

          // convert original node to next/image
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-sequences
          ;(imageNode.type = 'mdxJsxFlowElement'),
            (imageNode.name = 'Image'),
            (imageNode.attributes = [
              { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
              { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
              {
                type: 'mdxJsxAttribute',
                name: 'width',
                value: dimension.width,
              },
              {
                type: 'mdxJsxAttribute',
                name: 'height',
                value: dimension.height,
              },
            ])

          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          node.children = [imageNode]
        }
      },
    )
  }
}

export default remarkImgToJsx
