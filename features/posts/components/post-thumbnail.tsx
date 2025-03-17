'use client';

import Image from 'next/image';

import { usePostContext } from './post-provider';

const PostThumbnail = () => {
  const { image, title, imageMeta } = usePostContext();

  const parsedImageMeta: {
    width: number;
    height: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
  } = JSON.parse(imageMeta);

  return (
    <figure
      className="pointer-events-none absolute top-0 -right-[calc(100vw_-_100%)] -left-[calc(100vw_-_100%)] -z-[1] max-w-[calc(100vw_+_calc(100vw_-_100%))] overflow-hidden opacity-70 blur saturate-125 transition dark:opacity-65"
      style={{ height: '85vh', maxHeight: 380, width: '100vw' }}
    >
      <Image
        src={image as string}
        alt={title}
        priority
        className="size-full object-cover"
        {...parsedImageMeta}
        width={1200}
        height={630}
      />
    </figure>
  );
};

export default PostThumbnail;
