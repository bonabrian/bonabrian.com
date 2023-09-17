'use client'

import { m } from 'framer-motion'

import cn from '@/lib/cn'

interface ProgressProps {
  data: { name: string; percent?: number }
  className?: string
}

const Progress = ({ data, className }: ProgressProps) => {
  const { name, percent = 0 } = data

  const variants = {
    initial: { width: 0 },
    animate: {
      width: `${percent}%`,
      transition: { delay: 0.8 },
    },
  }

  return (
    <div className={cn('flex items-center justify-between gap-3')}>
      <div className={cn('w-24')}>{name}</div>
      <div
        className={cn(
          'relative flex h-3 flex-1 justify-center rounded-full bg-muted',
        )}
      >
        <m.span
          initial="initial"
          animate="animate"
          variants={variants}
          className={cn(
            className,
            'absolute left-0 top-0 h-3 rounded-full px-3',
          )}
        >
          &ensp;
        </m.span>
      </div>
      <div className={cn('w-8 text-right')}>{percent.toFixed(0)}%</div>
    </div>
  )
}

export default Progress
