'use client'

import { m, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

import cn from '@/lib/cn'

interface CounterProps {
  count: number
}

const Counter = ({ count }: CounterProps) => {
  const controls = useAnimationControls()

  useEffect(() => {
    const startMotion = async () => {
      await controls.start({
        y: [-20, 0],
        transition: { duration: 0.15 },
      })
    }

    if (count !== 0) startMotion()
  }, [controls, count])

  return (
    <div
      className={cn(
        'relative flex items-center gap-1 h-6 overflow-hidden rounded-full py-1 px-2 bg-accent',
      )}
    >
      {count === 0 ? (
        <span
          className={cn(
            'flex flex-col font-mono text-sm font-bold text-accent-foreground',
          )}
        >
          <span className={cn('flex h-5 items-center')}>0</span>
        </span>
      ) : (
        <m.span
          className={cn(
            'flex flex-col font-mono text-sm font-bold text-accent-foreground',
          )}
          animate={controls}
        >
          <span className={cn('flex h-5 items-center')}>&nbsp;</span>
          <span className={cn('flex h-5 items-center')}>{count}</span>
          <span className={cn('flex h-5 items-center')}>{count - 1}</span>
        </m.span>
      )}
    </div>
  )
}

export default Counter
