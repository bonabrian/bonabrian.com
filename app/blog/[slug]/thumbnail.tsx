'use client';

import Image from 'next/image';

import { usePostContext } from '@/features/posts/components/post-provider';
import { cn } from '@/lib/utils';

const Thumbnail = () => {
  const { image, title, imageMeta } = usePostContext();

  return (
    <figure
      className={cn(
        'pointer-events-none absolute top-0 -right-[calc(100vw_-_100%)] -left-[calc(100vw_-_100%)] -z-[1] max-w-[calc(100vw_+_calc(100vw_-_100%))] overflow-hidden opacity-40 blur saturate-125 transition',
        'dark:opacity-65',
      )}
      style={{ height: '85vh', maxHeight: 380, width: '100vw' }}
    >
      <Image
        src={image ?? ''}
        alt={title}
        priority
        className={cn('h-full w-full object-cover')}
        width={1200}
        height={630}
        {...imageMeta}
      />
    </figure>
  );
};

export default Thumbnail;
