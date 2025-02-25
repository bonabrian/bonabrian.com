'use client';

import Image from 'next/image';
import { forwardRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface BlurImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  imageClassName?: string;
  lazy?: boolean;
}

const BlurImage = forwardRef<HTMLImageElement, BlurImageProps>(
  (
    {
      alt,
      src,
      className,
      imageClassName,
      lazy = true,
      width = 1920,
      height = 1024,
      ...props
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div
        className={cn(
          'overflow-hidden',
          isLoading && 'animate-pulse',
          className,
        )}
      >
        <Image
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            isLoading && 'scale-[1.02] blur-xl grayscale',
            'rounded-lg',
            imageClassName,
          )}
          style={{
            transition: 'filter 700ms ease, transform 150ms ease',
          }}
          loading={lazy ? 'lazy' : undefined}
          priority={!lazy}
          quality={100}
          onLoad={() => setIsLoading(false)}
          width={width}
          height={height}
          {...props}
        />
      </div>
    );
  },
);

BlurImage.displayName = 'BlurImage';

export default BlurImage;
