import cn from '@/utils/cn'

import Reactions from './reactions'
import ShareButton from './share-button'

interface EngagementsProps {
  slug: string
}

const Engagements = ({ slug }: EngagementsProps) => {
  return (
    <div className={cn('mx-auto mt-16 flex w-full max-w-sm', 'sm:max-w-md')}>
      <div
        className={cn(
          'relative flex w-full items-center justify-between gap-4 rounded-xl bg-card p-4 shadow-border',
        )}
      >
        <Reactions slug={slug} />
        <ShareButton slug={slug} />
      </div>
    </div>
  )
}

export default Engagements
