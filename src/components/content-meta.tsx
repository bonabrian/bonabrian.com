'use client'

import type { IReadTimeResults } from 'reading-time'

import { useView } from '@/hooks'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'

import { Calendar, Clock, Eye } from './icons'
import { Container, IncrementCounter, Spinner } from './ui'

interface ContentMetaProps {
  timestamp: string
  readingTime: IReadTimeResults | null
  slug: string
}

const ContentMeta = ({ timestamp, readingTime, slug }: ContentMetaProps) => {
  const { raw, formatted } = formatDate({ timestamp })
  const { views, loading } = useView({ slug, trackView: true })

  return (
    <Container className={cn('mb-8')}>
      <div
        className={cn(
          'flex gap-4 text-sm text-gray-900/60',
          'dark:text-slate-100/70',
        )}
      >
        <div className={cn('flex items-center gap-1.5')}>
          <Calendar />
          <time dateTime={raw}>{formatted}</time>
        </div>
        <div className={cn('flex items-center gap-1.5')}>
          <Clock />
          <span title="Estimated read time">{readingTime?.text}</span>
        </div>
        <div className={cn('flex items-center gap-1.5')}>
          <Eye />
          <span
            title="Number of view(s)"
            className={cn('flex items-center gap-1.5')}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <IncrementCounter to={views?.total ?? 0} /> views
              </>
            )}
          </span>
        </div>
      </div>
    </Container>
  )
}

export default ContentMeta
