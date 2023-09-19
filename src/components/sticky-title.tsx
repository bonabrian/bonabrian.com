'use client'

import { m } from 'framer-motion'
import { useLayoutEffect, useState } from 'react'

import { useMediaQuery, useOnScroll } from '@/hooks'
import cn from '@/lib/cn'
import { min } from '@/lib/screens'

interface StickyTitleProps {
  title: string
  elementRef: React.RefObject<HTMLDivElement | null>
  gap?: number
}

const StickyTitle = ({ title, elementRef, gap = 64 }: StickyTitleProps) => {
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

  const transition = { duration: 0.3, ease: 'easeInOut' }
  const variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const isMinMd = useMediaQuery(min('md'))

  return (
    <>
      {isScrolled && isMinMd ? (
        <m.div
          className={cn(
            'sticky top-0 bg-background z-50 backdrop-blur h-16 flex justify-center items-center shadow-sm px-4 text-center',
          )}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={transition}
        >
          <h1 className={cn('text-lg font-semibold')}>{title}</h1>
        </m.div>
      ) : null}
    </>
  )
}

export default StickyTitle
