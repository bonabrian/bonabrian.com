import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { useDarkTheme } from '@/hooks'

import type { ImageLightBoxProps } from './types'

const ImageLightBox = ({ src, closeLightBox }: ImageLightBoxProps) => {
  const { isDark, hasMounted } = useDarkTheme()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [close, setClose] = useState(false)

  const handleClose = useCallback(() => {
    setClose(true)
    document.documentElement.classList.remove('prevent-scroll')
    setTimeout(() => closeLightBox(), 300)
  }, [closeLightBox])

  const handleKeydown = useCallback(
    (e: ReactKeyboardEvent | KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose],
  )

  useEffect(() => {
    document.documentElement.classList.add('prevent-scroll')
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [handleKeydown])

  const style = {
    '--tw-bg-opacity': hasMounted && isDark ? 0.7 : 0.8,
    opacity: !close && imageLoaded ? 1 : 0,
  } as React.CSSProperties

  return (
    <div
      role='button'
      tabIndex={0}
      className='lightbox-overlay fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-300 ease-out'
      style={style}
      onClick={handleClose}
      onKeyDown={handleKeydown}
    >
      <div className='w-full h-full relative flex justify-center items-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src.toString()}
          onLoad={() => setImageLoaded(true)}
          className='cursor-zoom-out max-w-[90vw] max-h-[80vh]'
          alt='lightbox'
        />
      </div>
    </div>
  )
}

export default ImageLightBox
