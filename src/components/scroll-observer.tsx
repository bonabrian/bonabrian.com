'use client'

import { createContext, useCallback, useEffect, useState } from 'react'

interface ScrollValue {
  scrollY: number
  scrollHeight: number
}

export const ScrollContext = createContext<ScrollValue>({
  scrollY: 0,
  scrollHeight: 0,
})

interface ScrollObserverProps {
  children: React.ReactNode
}

const ScrollObserver = ({ children }: ScrollObserverProps) => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
    setScrollHeight(document.body.scrollHeight)
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, { passive: true })

    return () => document.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ScrollContext.Provider value={{ scrollY, scrollHeight }}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollObserver
