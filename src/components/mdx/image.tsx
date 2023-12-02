'use client'

import type { ImageProps as NextImageProps } from 'next/image'
import NextImage from 'next/image'
import { useState } from 'react'

import cn from '@/lib/cn'
import { getDomainFromUrl } from '@/lib/utils'

import { Link } from '../ui'
import ImageZoom from './image-zoom'

type BaseImageProps = Omit<NextImageProps, 'width' | 'height' | 'fill'>
type SizeProps = BaseImageProps & { size?: number }
type DimensionProps = BaseImageProps & {
  width?: number
  height?: number
  fill?: boolean
}

type ImageProps = (SizeProps | DimensionProps) & {
  zoomableImage?: boolean
  source?: string
}

const Image = ({
  zoomableImage = true,
  source,
  className,
  ...props
}: ImageProps) => {
  const { size = 0, ...otherProps } = props as SizeProps
  const {
    width = size,
    height = size,
    fill = true,
    ...rest
  } = otherProps as DimensionProps

  const [zoomed, setZoomed] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const zoomImage = () => {
    if (zoomableImage) setZoomed(true)
  }

  return (
    <figure>
      <div
        className={cn(
          fill ? 'relative aspect-video' : '',
          isLoading && 'animate-pulse',
          className,
        )}
      >
        <NextImage
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          loading={props.priority ? undefined : props.loading || 'lazy'}
          decoding="async"
          className={cn(
            'rounded-xl object-cover',
            'transition-[scale,filter] duration-700',
            isLoading && 'scale-[1.01] blur-xl grayscale',
            zoomableImage && 'cursor-zoom-in',
          )}
          onClick={zoomImage}
          onLoad={() => setLoading(false)}
          fill={fill}
          {...rest}
        />
        {zoomed && <ImageZoom unZoom={() => setZoomed(false)} {...rest} />}
      </div>
      {source && (
        <figcaption className={cn('mt-1 text-sm')}>
          <span className={cn('flex items-center justify-center gap-1')}>
            <span className={cn('text-muted-foreground')}>Source:</span>{' '}
            <Link href={source ?? ''} className={cn('hover:underline')}>
              {getDomainFromUrl(source)}
            </Link>
          </span>
        </figcaption>
      )}
    </figure>
  )
}

export default Image
