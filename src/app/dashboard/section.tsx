'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

import { Skeleton } from '@/components/ui'
import cn from '@/utils/cn'

interface SectionProps {
  title: string
  description: string
  icon: JSX.Element
  children: React.ReactNode
  appendix?: React.ReactNode
  loading?: boolean
}

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

const Section = ({
  title,
  description,
  icon,
  children,
  appendix,
  loading,
}: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <m.section
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={sectionRef}
      transition={{ duration: 0.5 }}
      className={cn('will-change-[transform, opacity] flex flex-col gap-2')}
    >
      <div
        className={cn('flex items-center gap-1 font-cal text-xl font-medium')}
      >
        {icon}
        <h2 className={cn('capitalize')}>{title}</h2>
      </div>
      <div
        className={cn(
          'flex flex-col justify-between gap-2',
          'md:flex-row md:items-center',
        )}
      >
        <p>{description}</p>
        {appendix && <>{appendix}</>}
      </div>
      {loading ? (
        <div className={cn('grid gap-3 py-2', 'md:grid-cols-3')}>
          <Skeleton className={cn('h-16 w-full')} />
          <Skeleton className={cn('h-16 w-full')} />
          <Skeleton className={cn('h-16 w-full')} />
        </div>
      ) : (
        <>{children}</>
      )}
    </m.section>
  )
}

export default Section
