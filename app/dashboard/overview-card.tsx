import IncrementCounter from '@/components/shared/increment-counter';
import { cn } from '@/lib/utils';

interface OverviewCardProps {
  label: string;
  value?: number | string;
  unit?: string;
}

const OverviewCard = ({ label, value, unit }: OverviewCardProps) => {
  return (
    <div
      className={cn(
        'group bg-card shadow-border flex flex-col self-center rounded-xl px-4 py-3 transition-all duration-200',
      )}
    >
      <span className={cn('text-card-foreground')}>
        {label}
        {unit && <span> ({unit})</span>}
      </span>
      <div className={cn('font-cal flex items-end')}>
        {typeof value === 'number' ? (
          <div className={cn('text-xl')}>
            <IncrementCounter to={value} />
          </div>
        ) : (
          <div>{value}</div>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
