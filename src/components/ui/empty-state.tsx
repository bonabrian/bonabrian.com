import cn from '@/lib/cn'

import { MoodUnconscious } from '../icons'

interface EmptyStateProps {
  message: string
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'my-4 flex flex-col items-center justify-center space-y-1 py-3',
      )}
    >
      <MoodUnconscious className={cn('h-16 w-16')} />
      <p className={cn('text-center')}>{message}</p>
    </div>
  )
}

export default EmptyState
