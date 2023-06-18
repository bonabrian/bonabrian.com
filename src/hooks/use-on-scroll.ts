import { useEffect, useState } from 'react'

export const useOnScroll = (threshold: number = 0): boolean => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return isScrolled
}
