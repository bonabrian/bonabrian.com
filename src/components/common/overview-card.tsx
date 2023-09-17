import cn from '@/lib/cn'

import IncrementCounter from './increment-counter'

interface OverviewCardProps {
  label: string
  value: number | string
  unit?: string
}

const OverviewCard = ({ label, value, unit = '' }: OverviewCardProps) => {
  return (
    <div
      className={cn('flex flex-col self-center rounded-md bg-card py-3 px-4')}
    >
      <span className={cn('text-sm text-card-foreground')}>
        {label}
        {unit && <span className={cn('text-sm')}> ({unit})</span>}
      </span>
      <div className={cn('flex  items-end')}>
        <div className={cn('text-xl font-medium', 'lg:text-2xl')}>
          {typeof value === 'number' ? <IncrementCounter to={value} /> : null}
        </div>
      </div>
    </div>
  )
}

export default OverviewCard
