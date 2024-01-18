import { Button } from '@/components/ui'
import cn from '@/utils/cn'

const AvailableForHire = ({ isAvailable }: { isAvailable: boolean }) => {
  return isAvailable ? (
    <Button
      className={cn(
        'pointer-events-none gap-3 border-none px-3 shadow-none',
        'dark:shadow-none',
      )}
      variant="outline"
      size="sm"
    >
      <div className={cn('relative flex h-2 w-2')}>
        <span
          className={cn(
            'absolute -left-1 -top-1 inline-flex h-4 w-4 animate-ping rounded-full bg-green-500 opacity-75',
          )}
        />
        <span
          className={cn(
            'relative inline-flex h-2 w-2 rounded-full bg-green-400',
          )}
        />
      </div>
      Available for Hire
    </Button>
  ) : null
}

export default AvailableForHire
