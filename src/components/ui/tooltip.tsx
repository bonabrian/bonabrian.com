'use client'

import { m } from 'framer-motion'
import { useState } from 'react'

import cn from '@/utils/cn'

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
            'absolute bottom-full mb-2 block w-max max-w-xs rounded bg-accent px-2 py-1 text-xs font-medium text-accent-foreground',
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
