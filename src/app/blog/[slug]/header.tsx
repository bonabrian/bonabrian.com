'use client'

import type { IReadTimeResults } from 'reading-time'

import { Clock, Eye } from '@/components/icons'
import PageHeader from '@/components/page-header'
import { BackButton, Container } from '@/components/ui'
import useView from '@/hooks/use-view'
import cn from '@/utils/cn'
import { formatDate } from '@/utils/date'

interface HeaderProps {
  title: string
  date: string
  readingTime: IReadTimeResults
  slug: string
  description?: string
}

const Header = ({
  title,
  date,
  readingTime,
  slug,
  description,
}: HeaderProps) => {
  const publishedDate = formatDate(date)
  const { views } = useView({ slug, trackView: true })

  return (
    <>
      <BackButton />
      <PageHeader title={title} description={description} />
      <Container>
        <div
          className={cn(
            'flex flex-col justify-between gap-2 text-sm font-medium text-muted-foreground',
            'sm:flex-row',
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

export default Header
