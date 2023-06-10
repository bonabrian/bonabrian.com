'use client'

import { animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  from?: number
  to: number
  duration?: number
}

const CountUp = ({ from = 0, to, duration = 1 }: CountUpProps) => {
  const nodeRef = useRef<HTMLSpanElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    const node = nodeRef.current
    if (!node) return

    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = Math.round(value).toString()
      },
    })

    return () => controls.stop()
  }, [duration, from, isInView, to])

  return <span ref={nodeRef}>{to}</span>
}

export default CountUp
