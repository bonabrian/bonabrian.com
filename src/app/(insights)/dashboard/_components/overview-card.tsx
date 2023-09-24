import { IncrementCounter } from '@/components/ui'
import cn from '@/lib/cn'

interface OverviewCardProps {
  label: string
  value: number | string
  unit?: string
}

const OverviewCard = ({ label, value, unit = '' }: OverviewCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col self-center rounded-md bg-card py-3 px-4 font-plus-jakarta',
      )}
    >
      <span className={cn('text-sm text-card-foreground/70')}>
        {label}
        {unit && <span className={cn('text-sm')}> ({unit})</span>}
      </span>
      <div className={cn('flex  items-end')}>
        {typeof value === 'number' ? (
          <div className={cn('text-xl font-medium', 'lg:text-2xl')}>
            <IncrementCounter to={value} />
          </div>
        ) : (
          <div>{value}</div>
        )}
      </div>
    </div>
  )
}

export default OverviewCard
