'use client'

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

interface IncrementCounterProps {
  from?: number
  to: number
  duration?: number
}

const IncrementCounter = ({
  from = 0,
  to,
  duration = 1,
}: IncrementCounterProps) => {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  const nodeRef = useRef(null)
  const inView = useInView(nodeRef)

  useEffect(() => {
    if (inView) animate(count, to, { duration })
  }, [count, duration, inView, to])

  return <m.span ref={nodeRef}>{rounded}</m.span>
}

export default IncrementCounter
