'use client';

import Image from 'next/image';

import { usePostContext } from '@/components/providers/post-provider';
import { cn } from '@/lib/utils';

const Thumbnail = () => {
  const { image, title, imageMeta } = usePostContext();

  return (
    <figure
      className={cn(
        'saturate-125 pointer-events-none absolute -left-[calc(100vw_-_100%)] -right-[calc(100vw_-_100%)] top-0 -z-[1] max-w-[calc(100vw_+_calc(100vw_-_100%))] overflow-hidden opacity-40 blur transition',
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
