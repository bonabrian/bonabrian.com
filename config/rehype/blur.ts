import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { getPlaiceholder } from 'plaiceholder';

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
