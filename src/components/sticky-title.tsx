'use client'

import { useLayoutEffect, useState } from 'react'

import useOnScroll from '@/hooks/use-on-scroll'
import useMediaQuery from '@/hooks/use-media-query'
import { min } from '@/utils/screens'

interface StickyTitleProps {
  title: string
  elementRef: React.RefObject<HTMLDivElement | null>
  gap?: number
}

const StickyTitle = ({ title, elementRef, gap = -64 }: StickyTitleProps) => {
  const [threshold, setThreshold] = useState(0)

  useLayoutEffect(() => {
    const handleResize = () => {
      if (elementRef.current !== null) {
        setThreshold(elementRef.current.clientHeight)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [elementRef])

  const isScrolled = useOnScroll(threshold + gap)
  const variants = {
    initial: { opacity: isScrolled ? 0 : 1, y: isScrolled ? gap : 0 },
    animate: { opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : gap },
  }

  const isMinMd = useMediaQuery(min('md'))

  const scrollToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } catch {
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      {isMinMd && (
        <>
          {isScrolled ? null : null}
        </>
      )}
    </>
  )
}

export default StickyTitle
