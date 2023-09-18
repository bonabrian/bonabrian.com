'use client'

import type { IReadTimeResults } from 'reading-time'

import { BackButton, Container } from '@/components/common'
import { Clock, Eye } from '@/components/icons'
import PageHeader from '@/components/page-header'
import { ROUTES } from '@/constants/links'
import { useView } from '@/hooks'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'

interface MetaHeaderProps {
  title: string
  timestamp: string
  readingTime: IReadTimeResults | null
  slug: string
}

const MetaHeader = ({
  title,
  timestamp,
  readingTime,
  slug,
}: MetaHeaderProps) => {
  const publishedDate = formatDate(timestamp)
  const { views } = useView({ slug, trackView: true })

  return (
    <>
      <PageHeader title={title} centered />
      <Container className={cn('mb-8')}>
        <BackButton href={ROUTES.blog} />
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

export default MetaHeader
