import { IncrementCounter } from '@/components/ui'
import cn from '@/utils/cn'

interface OverviewCardProps {
  label: string
  value: number | string
  unit?: string
}

const OverviewCard = ({ label, value, unit }: OverviewCardProps) => (
  <div
    className={cn(
      'group flex flex-col self-center rounded-xl bg-card px-4 py-3 shadow-border transition-all duration-200',
    )}
  >
    <span className={cn('text-card-foreground')}>
      {label}
      {unit && <span> ({unit})</span>}
    </span>
    <div className={cn('flex items-end font-cal')}>
      {typeof value === 'number' ? (
        <div className={cn('text-xl')}>
          <IncrementCounter to={value} />
        </div>
      ) : (
        <div>{value}</div>
      )}
    </div>
  </div>
)

export default OverviewCard
