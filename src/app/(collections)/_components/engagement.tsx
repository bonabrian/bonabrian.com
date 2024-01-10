import cn from '@/lib/cn'

import Reactions from './reactions'
import ShareButton from './share-button'

interface EngagementProps {
  slug: string
}

const Engagement = ({ slug }: EngagementProps) => {
  return (
    <div className={cn('mx-auto mt-16 flex w-full max-w-sm', 'sm:max-w-md')}>
      <div
        className={cn(
          'relative flex w-full items-center justify-between gap-4 rounded-lg bg-card p-4',
        )}
      >
        <Reactions slug={slug} />
        <ShareButton slug={slug} />
      </div>
    </div>
  )
}

export default Engagement
