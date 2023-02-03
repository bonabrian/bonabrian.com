import { useContext, useEffect, useState } from 'react'

import { ScrollContext } from './ScrollObserver'

const ScrollProgressBar = () => {
  const [width, setWidth] = useState(0)
  const { scrollY, scrollHeight } = useContext(ScrollContext)

  useEffect(() => {
    const el = document.documentElement
    const percent = (scrollY / (scrollHeight - el.clientHeight)) * 100

    setWidth(percent)
  }, [setWidth, scrollHeight, scrollY])

  return (
    <div
      className="fixed top-0 left-0 h-1 z-50 bg-primary-500"
      style={{ width: `${width}%` }}
    />
  )
}

export default ScrollProgressBar
