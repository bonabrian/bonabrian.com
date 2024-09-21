import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { getPlaiceholder } from 'plaiceholder';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

interface ImageNode {
  name: 'img' | string;
  type: 'mdxJsxFlowElement' | 'element' | string;
  tagName: 'img' | string;
  properties: {
    src: string;
    height?: number;
    width?: number;
    blurDataURL?: string;
    placeholder?: 'blur' | 'empty';
    loading?: 'lazy' | 'eager';
  } & Record<string, unknown>;
  attributes?: Array<{
    type: 'mdxJsxFlowElement' | string;
    name: 'src' | string;
    value: unknown;
  }>;
  children?: Array<ImageNode>;
  parent?: ImageNode;
}

interface BlurResult {
  width: number;
  height: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const getBlurData = async (
  imageSource?: string,
  placeholderSize: number = 12,
  defaultWidth: number = 0,
  defaultHeight: number = 0,
): Promise<BlurResult | null> => {
  if (!imageSource) return null;

  const isExternal = imageSource.startsWith('http');

  try {
    let imageBuffer: Buffer | undefined = undefined;
    if (!isExternal) {
      const filePath = path.join(process.cwd(), 'public', imageSource);
      imageBuffer = await readFile(filePath);
    } else {
      const imageRes = await fetch(imageSource);
      const arrayBuffer = await imageRes.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }

    const blur = await getPlaiceholder(imageBuffer, {
      size: placeholderSize,
    });

    return {
      width:
        defaultWidth > 0
          ? Math.min(defaultWidth, blur.metadata.width)
          : blur.metadata.width || defaultWidth,
      height:
        defaultHeight > 0
          ? Math.min(defaultHeight, blur.metadata.height)
          : blur.metadata.height || defaultHeight,
      blurDataURL: blur.base64,
      placeholder: 'blur',
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getSrcFromImageNode = (
  node?: ImageNode,
): { src: string; width?: number; height?: number } | null => {
  if (!node) return null;

  const { jsx, img } = getNodeType(node);

  let src = '';
  let w = 0;
  let h = 0;

  if (jsx === true) {
    src =
      node.attributes?.find((attr) => attr.name === 'src')?.value?.toString() ??
      '';
    w = Number(
      node.attributes
        ?.find((attr) => attr.name === 'width')
        ?.value?.toString() ?? '0',
    );
    h = Number(
      node.attributes?.find((attr) => attr.name === 'height')?.value
        ?.toString ?? '0',
    );
  } else if (img === true) {
    src = node.properties.src;
    w = node.properties.width ?? 0;
    h = node.properties.height ?? 0;
  }

  return {
    src: src.replace(/["']/g, '').replace(/%22/g, ''),
    width: w,
    height: h,
  };
};

const getNodeType = (node: Node): { jsx?: boolean; img?: boolean } => {
  const img = node as ImageNode;
  const isJsxImage =
    img.type === 'mdxJsxFlowElement' &&
    (img.name === 'img' || img.name === 'Image');

  if (isJsxImage) {
    return {
      jsx: Boolean(img.attributes?.find((attr) => attr.name === 'src')?.value),
    };
  }

  const isNormalImage = img.type === 'element' && img.tagName === 'img';

  return {
    img:
      isNormalImage && img.properties && typeof img.properties.src === 'string',
  };
};

const addProps = async (node: ImageNode): Promise<ImageNode> => {
  const { src, width, height } = getSrcFromImageNode(node) ?? {};
  if (!src) return node;

  const res = await getBlurData(src, 10, width, height).catch(() => null);
  if (!res) return node;

  const { jsx, img } = getNodeType(node);

  if (jsx === true) {
    node.name = 'Image';
    const newProps = Object.keys(res).map((prop) => ({
      type: 'mdxJsxFlowElement',
      name: prop,
      value: res[prop as keyof typeof res],
    })) as ImageNode['attributes'];

    const unique = [...(node.attributes ?? []), ...(newProps ?? [])].reduce(
      (prev, o) =>
        prev?.some((x) => x.name === o.name) ? prev : [...(prev ?? []), o],
      [] as ImageNode['attributes'],
    );

    node.attributes = unique;
  } else if (img === true) {
    node.properties = { ...(node.properties ?? {}), ...res };
  }

  return node;
};

const isImageNode = (node: Node): node is ImageNode => {
  const { jsx, img } = getNodeType(node);

  return jsx === true || img === true;
};

export const imageBlurMetadata = () => {
  return async (tree: Node) => {
    const images: ImageNode[] = [];

    visit(tree, ['mdxJsxFlowElement', 'element'], (node) => {
      const typedNode = node as ImageNode;
      if (typedNode && isImageNode(typedNode)) images.push(typedNode);
    });

    for (const image of images) {
      await addProps(image);
    }

    return tree;
  };
};
