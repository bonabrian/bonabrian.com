import cn from '@/lib/cn'

import Reactions from './reactions'
import ShareButton from './share-button'

interface EngagementProps {
  slug: string
}

const Engagement = ({ slug }: EngagementProps) => {
  return (
    <div className={cn('mt-16 flex mx-auto w-full max-w-sm', 'sm:max-w-md')}>
      <div
        className={cn(
          'relative flex justify-between items-center w-full gap-4 p-4 rounded-lg bg-card',
        )}
      >
        <Reactions slug={slug} />
        <ShareButton slug={slug} />
      </div>
    </div>
  )
}

export default Engagement
