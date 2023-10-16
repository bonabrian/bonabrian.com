'use client'

import { m } from 'framer-motion'
import { forwardRef } from 'react'

import cn from '@/lib/cn'

import { Container } from './ui'

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  centered?: boolean
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, centered }: PageHeaderProps, ref) => {
    const animation = {
      hide: centered ? { y: 32, opacity: 0 } : { x: -32, opacity: 0 },
      show: centered ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 },
    }

    return (
      <div className={cn('bg-pattern py-12', 'md:py-16', 'lg:py-20')} ref={ref}>
        <Container
          className={cn(
            'pointer-events-none select-none overflow-hidden',
            centered && 'text-center',
          )}
        >
          <m.div
            initial={animation.hide}
            animate={animation.show}
            transition={{ delay: 0.1 }}
          >
            <h1
              className={cn(
                'text-4xl font-extrabold leading-tight',
                'md:text-5xl md:leading-tight',
                'lg:text-6xl lg:leading-tight',
              )}
            >
              {title}
            </h1>
          </m.div>
          {description && (
            <m.div
              initial={animation.hide}
              animate={animation.show}
              transition={{ delay: 0.2 }}
            >
              <p className={cn('mt-4 text-lg')}>{description}</p>
            </m.div>
          )}
        </Container>
      </div>
    )
  },
)

export default PageHeader
