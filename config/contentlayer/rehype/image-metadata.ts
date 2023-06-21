// Code based on https://github.com/nikolovlazar/nikolovlazar.com/blob/main/src/utils/plugins/image-metadata.ts
import { readFile } from 'node:fs/promises'

import imageSize from 'image-size'
import type { ISizeCalculationResult } from 'image-size/dist/types/interface'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import type { Node } from 'unist'
import { visit } from 'unist-util-visit'
import { promisify } from 'util'

const sizeOf = promisify(imageSize)

interface ImageNode {
  name: string
  type: 'element' | string
  tagName: 'img' | string
  properties: {
    src: string
    height?: number
    width?: number
    blurDataURL?: string
    placeholder?: 'blur' | 'empty'
    loading?: 'lazy' | 'eager'
  } & Record<string, unknown>
  attributes?: Array<{
    type: string
    name: string
    value: {
      type: string
      value: unknown
    }
  }>
  children?: Array<ImageNode>
  parent?: ImageNode
}

const isImageNode = (node: Node): node is ImageNode => {
  const img = node as ImageNode
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  )
}

interface BlurResult {
  size: {
    width: number
    height: number
  }
  blur64?: string
}

export const getBlurData = async (
  imageSource?: string,
  placeholderSize: number = 12,
): Promise<BlurResult | null> => {
  if (!imageSource) return null

  const isExternal = imageSource.startsWith('http')
  let res: ISizeCalculationResult | undefined
  let blur64: string

  if (!isExternal) {
    const filePath = path.join(process.cwd(), 'public', imageSource)
    res = await sizeOf(filePath)
    const imageBuffer = await readFile(filePath)
    const plaiceholderResult = await getPlaiceholder(imageBuffer, {
      size: placeholderSize,
    })

    res = {
      ...res,
      width: plaiceholderResult.metadata.width,
      height: plaiceholderResult.metadata.height,
    }

    blur64 = plaiceholderResult.base64
  } else {
    const imageRes = await fetch(imageSource)
    const arrayBuffer = await imageRes.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    res = await imageSize(buffer)

    const plaiceholderResult = await getPlaiceholder(buffer, {
      size: placeholderSize,
    })

    res = {
      ...res,
      width: plaiceholderResult.metadata.width,
      height: plaiceholderResult.metadata.height,
    }

    blur64 = plaiceholderResult.base64
  }

  if (!res) throw Error(`Invalid image with src "${imageSource}"`)
  return {
    size: { width: res.width || 0, height: res.height || 0 },
    blur64,
  }
}

const addProps = async (node: ImageNode): Promise<ImageNode> => {
  const src = node.properties.src.replace(/["']/g, '').replace(/%22/g, '')
  const res = await getBlurData(src).catch(() => null)

  if (!res) return node

  node.properties = {
    ...node.properties,
    width: res.size.width,
    height: res.size.height,
    blurDataURL: res.blur64,
    placeholder: 'blur',
    loading: 'lazy',
  }

  return node
}

const imageMetaData = () => {
  return async (tree: Node) => {
    const images: ImageNode[] = []

    visit(tree, 'element', (node) => {
      if (isImageNode(node)) {
        images.push(node)
      }
    })

    for (const image of images) {
      await addProps(image)
    }

    return tree
  }
}

export default imageMetaData
