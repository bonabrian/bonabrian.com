import NextImage from 'next/image'
import { useState } from 'react'

import ImageLightBox from '../ImageLightBox'
import type { DimensionProps, ImageProps, SizeProps } from './types'

export const Image = ({ shouldOpenLightBox = true, ...props }: ImageProps) => {
  const { size = 0, ...otherProps } = props as SizeProps
  const { width = size, height = size, ...rest } = otherProps as DimensionProps

  const [openLightBox, setOpenLightBox] = useState(false)
  const handleOpenLightBox = () => {
    if (shouldOpenLightBox) setOpenLightBox(true)
  }

  return (
    <>
      <NextImage
        {...rest}
        width={width}
        height={height}
        loading={props.priority ? undefined : props.loading}
        decoding='async'
        className={`rounded-xl object-cover object-center ${
          shouldOpenLightBox ? `cursor-zoom-in` : ''
        }`}
        onClick={handleOpenLightBox}
      />
      {openLightBox && (
        <ImageLightBox closeLightBox={() => setOpenLightBox(false)} {...rest} />
      )}
    </>
  )
}
