import { RiCalendarLine, RiTimeLine } from 'react-icons/ri'
import type { IReadTimeResults } from 'reading-time'

import { routes } from '@/lib/constants'
import { defaultMetadata } from '@/lib/metadata'
import { formatDate } from '@/lib/utils'

import Link from './link'
import ShareButtons from './share-buttons'
import ViewsCounter from './views-counter'

interface ContentHeaderProps {
  title: string
  slug: string
  description?: string
  excerpt?: string
  date?: string
  readingTime?: IReadTimeResults | null
}

const ContentHeader = ({
  title,
  slug,
  description,
  excerpt,
  date,
  readingTime,
}: ContentHeaderProps) => {
  const publishedDate = formatDate({ timestamp: date })

  return (
    <div className="flex flex-col justify-center gap-y-4 my-4">
      <h1 className="font-bold text-4xl md:text-5xl">{title}</h1>
      {description && (
        <p className="text-sm sm:text-base text-gray-900/80 dark:text-white/80">
          {description}
        </p>
      )}
      <div className="flex flex-col">
        <Link
          href={routes.ABOUT}
          className="text-sm hover:underline self-start"
        >
          {defaultMetadata.author.name}
        </Link>
        <div className="flex flex-wrap self-start text-xs gap-y-1 sm:gap-y-0 text-gray-900/50 dark:text-white/60">
          <div className="flex items-center space-x-1 after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base">
            <RiCalendarLine />
            <span title={publishedDate.raw}>{publishedDate.formatted}</span>
          </div>
          <div className="flex items-center space-x-1 after:content-['•'] after:inline-block after:align-middle after:mx-2 after:text-base">
            <RiTimeLine />
            <span title="Estimated read time">{readingTime?.text}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ViewsCounter slug={slug} />
          </div>
        </div>
        <ShareButtons title={title} description={excerpt ?? description} />
      </div>
    </div>
  )
}

export default ContentHeader
