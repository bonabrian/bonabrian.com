'use client'

import cx from 'classnames'
import type { ImageProps as NextImageProps } from 'next/image'
import NextImage from 'next/image'
import { useState } from 'react'

import { getDomainFromUrl } from '@/lib/utils'

import ImageLightBox from '../image-lightbox'
import Link from '../link'

type BaseImageProps = Omit<NextImageProps, 'width' | 'height' | 'fill'>
type SizeProps = BaseImageProps & { size?: number }
type DimensionProps = BaseImageProps & {
  width?: number
  height?: number
  fill?: boolean
}

type ImageProps = (SizeProps | DimensionProps) & {
  shouldOpenLightBox?: boolean
  source?: string
}

const Image = ({
  shouldOpenLightBox = true,
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

  const [openLightBox, setOpenLightBox] = useState(false)
  const handleOpenLightBox = () => {
    if (shouldOpenLightBox) setOpenLightBox(true)
  }

  return (
    <figure>
      <div className={cx(fill ? 'relative aspect-video' : '', className)}>
        <NextImage
          {...rest}
          width={fill ? undefined : width ?? undefined}
          height={fill ? undefined : height ?? undefined}
          loading={props.priority ? undefined : props.loading}
          decoding="async"
          className={cx(
            'object-cover rounded-xl',
            shouldOpenLightBox ? 'cursor-zoom-in' : '',
          )}
          onClick={handleOpenLightBox}
          fill={fill}
        />
        {openLightBox && (
          <ImageLightBox
            closeLightBox={() => setOpenLightBox(false)}
            {...rest}
          />
        )}
      </div>
      {source && (
        <figcaption
          className={cx('text-xs text-gray-900/60 dark:text-slate-100/70 mt-1')}
        >
          <span className={cx('flex items-center justify-center gap-1')}>
            Source <Link href={source ?? ''}>{getDomainFromUrl(source)}</Link>
          </span>
        </figcaption>
      )}
    </figure>
  )
}

export default Image
