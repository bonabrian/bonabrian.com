import type { ImageProps as NextImageProps } from 'next/image'

export interface ImageLightBoxProps extends Pick<NextImageProps, 'src'> {
  closeLightBox: () => void
}
