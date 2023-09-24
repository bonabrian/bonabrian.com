'use client'

import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import type { IReadTimeResults } from 'reading-time'

import { BackButton, Container } from '@/components/common'
import { Clock, Eye } from '@/components/icons'
import PageHeader from '@/components/page-header'
import { useView } from '@/hooks'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'

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
            'flex flex-col sm:flex-row gap-2 justify-between text-muted-foreground text-sm font-medium',
          )}
        >
          <div>
            Published on
            <time dateTime={publishedDate} className={cn('px-1')}>
              {publishedDate}
            </time>
          </div>
          <div className={cn('flex items-center gap-4')}>
            <div className={cn('flex gap-1 items-center')}>
              <Clock />
              <span title="Estimated read time">{readingTime?.text}</span>
            </div>
            <div className={cn('flex gap-1 items-center')}>
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
