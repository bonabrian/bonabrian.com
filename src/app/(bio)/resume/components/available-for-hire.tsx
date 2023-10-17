import { Button } from '@/components/ui'
import cn from '@/lib/cn'

const AvailableForHire = () => {
  return (
    <Button
      className={cn(
        'pointer-events-none gap-3 border-none px-3 uppercase shadow-none',
        'dark:shadow-none',
      )}
      variant="outline"
    >
      <div className={cn('relative flex h-2 w-2')}>
        <span
          className={cn(
            'absolute -left-1 -top-1 inline-flex h-4 w-4 animate-ping rounded-full bg-primary opacity-75',
          )}
        />
        <span
          className={cn('relative inline-flex h-2 w-2 rounded-full bg-primary')}
        />
      </div>
      Available for Hire
    </Button>
  )
}

export default AvailableForHire
