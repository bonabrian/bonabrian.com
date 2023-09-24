import { Button } from '@/components/ui'
import cn from '@/lib/cn'

const AvailableForHire = () => {
  return (
    <Button
      className={cn(
        'pointer-events-none gap-3 px-3 uppercase border-none shadow-none',
        'dark:shadow-none',
      )}
      variant="outline"
    >
      <span className={cn('relative flex h-2 w-2')}>
        <span
          className={cn(
            'bg-primary absolute -top-1 -left-1 inline-flex h-4 w-4 animate-ping rounded-full opacity-75',
          )}
        />
        <span
          className={cn('bg-primary relative inline-flex h-2 w-2 rounded-full')}
        />
      </span>
      Available for Hire
    </Button>
  )
}

export default AvailableForHire
