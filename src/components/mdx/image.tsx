'use client'

import NextImage from 'next/image'
import { forwardRef, useState } from 'react'

import cn from '@/utils/cn'

interface ImageProps extends React.ComponentPropsWithRef<typeof NextImage> {
  lazy?: boolean
}

const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    { src, alt, className, lazy = true, width = 1920, height = 1024, ...rest },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
      <div
        className={cn(
          'overflow-hidden',
          isLoading && 'animate-pulse',
          className,
        )}
        ref={ref}
      >
        <NextImage
          className={cn(
            'rounded-xl transition-[scale,filter] duration-700',
            isLoading && 'scale-[1.02] blur-xl grayscale',
          )}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={lazy ? 'lazy' : undefined}
          priority={!lazy}
          quality={100}
          onLoad={() => setIsLoading(false)}
          data-zoomable
          {...rest}
        />
      </div>
    )
  },
)

export default Image
