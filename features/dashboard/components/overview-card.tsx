import IncrementCounter from '@/components/increment-counter';

interface OverviewCardProps {
  label: string;
  value?: number | string;
  unit?: string;
}

const OverviewCard = ({ label, value, unit }: OverviewCardProps) => {
  return (
    <div className="group bg-card shadow-border flex flex-col self-center rounded-lg px-4 py-3 transition-all duration-200">
      <span className="text-card-foreground">
        {label} {unit && <span> ({unit})</span>}
      </span>
      <div className="font-cal flex items-end">
        {typeof value === 'number' ? (
          <IncrementCounter to={value} />
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
