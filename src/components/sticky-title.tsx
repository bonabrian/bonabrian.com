'use client'

import { m } from 'framer-motion'
import { useLayoutEffect, useState } from 'react'

import useMediaQuery from '@/hooks/use-media-query'
import useOnScroll from '@/hooks/use-on-scroll'
import cn from '@/utils/cn'
import { min } from '@/utils/screens'

import MobileNav from './mobile-nav'
import ThemeSwitch from './theme-switch'
import { Container } from './ui'

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

  const transition = { duration: 0.3, ease: 'easeInOut' }
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
          {isScrolled ? (
            <m.div
              initial="initial"
              animate="animate"
              variants={variants}
              transition={transition}
              className={cn('fixed left-0 right-0 top-0 z-50')}
            >
              <Container>
                <div
                  className={cn(
                    'flex h-16 items-center justify-between bg-background shadow-sm backdrop-blur',
                  )}
                >
                  <h1
                    className={cn('cursor-pointer font-cal text-lg')}
                    onClick={scrollToTop}
                  >
                    {title}
                  </h1>
                  <div className={cn('flex items-center gap-1')}>
                    <ThemeSwitch />
                    <MobileNav sticky={true} />
                  </div>
                </div>
              </Container>
            </m.div>
          ) : (
            <m.div
              initial={{ opacity: 0, y: gap }}
              transition={transition}
              className={cn('fixed left-0 right-0 top-0 z-50')}
            >
              <Container>
                <div
                  className={cn(
                    'flex h-16 items-center justify-between bg-background text-center shadow-sm backdrop-blur',
                  )}
                >
                  <h1 className={cn('font-cal text-lg')}>{title}</h1>
                </div>
              </Container>
            </m.div>
          )}
        </>
      )}
    </>
  )
}

export default StickyTitle
