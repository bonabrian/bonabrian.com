'use client'

import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import type { IReadTimeResults } from 'reading-time'

import { Clock, Eye } from '@/components/icons'
import PageHeader from '@/components/page-header'
import { BackButton, Container } from '@/components/ui'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'

import useView from '../hooks/use-view'
import StickyTitle from './sticky-title'

interface ContentMetaProps {
  title: string
  description?: string
  timestamp: string
  readingTime: IReadTimeResults | null
  slug: string
}

const ContentMeta = ({
  title,
  description,
  timestamp,
  readingTime,
  slug,
}: ContentMetaProps) => {
  const publishedDate = formatDate(timestamp)
  const { views } = useView({ slug, trackView: true })

  const pageHeaderRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const segments = pathname.split('/')

  return (
    <>
      <PageHeader title={title} description={description} ref={pageHeaderRef} />
      <StickyTitle title={title} elementRef={pageHeaderRef} />
      <Container className={cn('mb-8')}>
        <BackButton href={`/${segments[1]}`} />
        <div
          className={cn(
            'flex flex-col justify-between gap-2 text-sm font-medium text-muted-foreground sm:flex-row',
          )}
        >
          <div>
            Published on
            <time dateTime={publishedDate} className={cn('px-1')}>
              {publishedDate}
            </time>
          </div>
          <div className={cn('flex items-center gap-4')}>
            <div className={cn('flex items-center gap-1')}>
              <Clock />
              <span title="Estimated read time">{readingTime?.text}</span>
            </div>
            <div className={cn('flex items-center gap-1')}>
              <Eye />
              <span title="Number of view(s)">{views?.total ?? '-'} views</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ContentMeta
