import cn from '@/lib/cn'

import { MoodUnconscious } from '../icons'

interface EmptyStateProps {
  message: string
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-1 py-3 my-4',
      )}
    >
      <MoodUnconscious className={cn('w-16 h-16')} />
      <p className={cn('text-center')}>{message}</p>
    </div>
  )
}

export default EmptyState