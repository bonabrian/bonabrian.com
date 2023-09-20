import type { ImageProps as NextImageProps } from 'next/image'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { useTheme } from '@/hooks'
import cn from '@/lib/cn'

export interface ImageZoomProps extends Pick<NextImageProps, 'src'> {
  unZoom: () => void
}

const ImageZoom = ({ src, unZoom }: ImageZoomProps) => {
  const { theme, mounted } = useTheme()
  const isDark = theme === 'dark'
  const [imageLoaded, setImageLoaded] = useState(false)
  const [close, setClose] = useState(false)

  const handleClose = useCallback(() => {
    setClose(true)
    document.documentElement.classList.remove('overflow-y-hidden')
    setTimeout(() => unZoom(), 300)
  }, [unZoom])

  const handleKeydown = useCallback(
    (e: ReactKeyboardEvent | KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose],
  )

  useEffect(() => {
    document.documentElement.classList.add('overflow-y-hidden')
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [handleKeydown])

  const style = {
    '--tw-bg-opacity': mounted && isDark ? 0.7 : 0.8,
    opacity: !close && imageLoaded ? 1 : 0,
  } as React.CSSProperties

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'w-screen fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-300 ease-out',
      )}
      style={style}
      onClick={handleClose}
      onKeyDown={handleKeydown}
    >
      <div
        className={cn(
          'w-full h-full relative flex justify-center items-center',
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src.toString()}
          onLoad={() => setImageLoaded(true)}
          className={cn('cursor-zoom-out rounded-xl max-w-[90vw] max-h-[80vh]')}
          alt="Image Preview"
        />
      </div>
    </div>
  )
}

export default ImageZoom
