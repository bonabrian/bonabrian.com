'use client'

import { m } from 'framer-motion'
import { useState } from 'react'

import cn from '@/lib/cn'

interface TooltipProps {
  title: string
  children: React.ReactNode
}

const Tooltip = ({ title, children }: TooltipProps) => {
  const [visible, setVisible] = useState<boolean>(false)

  const onMouseEnter = () => {
    setVisible(true)
  }

  const onMouseLeave = () => {
    setVisible(false)
  }

  const variants = {
    hide: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className={cn('relative inline-block')}>
      <div
        className={cn('relative')}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
      {visible && (
        <m.div
          className={cn(
            'block absolute bottom-full mb-2 text-xs font-medium bg-accent text-accent-foreground rounded px-2 py-1 w-max max-w-xs',
          )}
          variants={variants}
          initial="hide"
          animate="show"
        >
          {title}
        </m.div>
      )}
    </div>
  )
}

export default Tooltip
