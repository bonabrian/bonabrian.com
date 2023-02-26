import classnames from 'classnames'
import type { ImageProps as NextImageProps } from 'next/image'
import NextImage from 'next/image'
import { useState } from 'react'

import ImageLightBox from '../image-lightbox'

type BaseImageProps = Omit<NextImageProps, 'width' | 'height' | 'fill'>
type SizeProps = BaseImageProps & { size?: number }
type DimensionProps = BaseImageProps & {
  width?: number
  height?: number
  fill?: boolean
}

type ImageProps = (SizeProps | DimensionProps) & {
  shouldOpenLightBox?: boolean
}

const Image = ({
  shouldOpenLightBox = true,
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
    <figure
      className={classnames(fill ? 'relative aspect-video' : '', className)}
    >
      <NextImage
        {...rest}
        width={width || undefined}
        height={height || undefined}
        loading={props.priority ? undefined : props.loading}
        decoding="async"
        className={classnames(
          'object-cover rounded-xl',
          shouldOpenLightBox ? 'cursor-zoom-in' : '',
        )}
        onClick={handleOpenLightBox}
        fill={fill}
      />
      {openLightBox && (
        <ImageLightBox closeLightBox={() => setOpenLightBox(false)} {...rest} />
      )}
    </figure>
  )
}

export default Image
