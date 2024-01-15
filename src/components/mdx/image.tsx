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

// export type ImageProps = {
//   imageClassName?: string
//   lazy?: boolean
// } & React.ComponentPropsWithoutRef<typeof NextImage>

// const Image = React.forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
//   const { alt, src, className, imageClassName, lazy = true, ...rest } = props
//   const [isLoading, setLoading] = React.useState(true)

//   return (
//     <div
//       className={cn('overflow-hidden', isLoading && 'animate-pulse', className)}
//       data-testid='image-container'
//       ref={ref}
//     >
//       <NextImage
//         className={cn(
//           'transition-[scale,filter] duration-700',
//           isLoading && 'scale-[1.02] blur-xl grayscale',
//           imageClassName
//         )}
//         src={src}
//         alt={alt}
//         loading={lazy ? 'lazy' : undefined}
//         priority={!lazy}
//         quality={100}
//         onLoad={() => setLoading(false)}
//         {...rest}
//       />
//     </div>
//   )
// })

// Image.displayName = 'Image'

// export default Image

// 'use client'

// import type { ImageProps as NextImageProps } from 'next/image'
// import NextImage from 'next/image'
// import { useState } from 'react'

// import cn from '@/utils/cn'

// type BaseImageProps = Omit<NextImageProps, 'width' | 'height' | 'fill'>
// type SizeProps = BaseImageProps & { size?: number }
// type DimensionProps = BaseImageProps & {
//   width?: number
//   height?: number
//   fill?: boolean
// }

// type ImageProps = (SizeProps | DimensionProps) & {
//   source?: string
// }

// const Image = ({ source, className, ...props }: ImageProps) => {
//   const { size = 0, ...otherProps } = props as SizeProps
//   const {
//     width = size,
//     height = size,
//     fill = true,
//     ...rest
//   } = otherProps as DimensionProps

//   const [isLoading, setIsLoading] = useState(true)

//   return (
//     <figure>
//       <div
//         className={cn(
//           fill && 'relative aspect-video',
//           isLoading && 'animate-pulse',
//           className,
//         )}
//       >
//         <NextImage
//           width={fill ? undefined : width}
//           height={fill ? undefined : height}
//           loading={props.priority ? undefined : props.loading || 'lazy'}
//           decoding="async"
//           className={cn(
//             'rounded-xl object-cover transition-[scale,filter] duration-200',
//             isLoading && 'scale-[1.01] blur-xl grayscale',
//           )}
//           onLoad={() => setIsLoading(false)}
//           fill={fill}
//           data-zoomable
//           {...rest}
//         />
//       </div>
//     </figure>
//   )
// }

// export default Image

export default Image
