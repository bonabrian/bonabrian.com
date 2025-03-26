import { cn } from '@/lib/utils';

const Equalizer = ({ className }: { className?: string }) => (
  <div className={cn('equalizer', className)}>
    <span />
    <span />
    <span />
  </div>
);

export default Equalizer;
