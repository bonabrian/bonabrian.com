import { cn } from '@/lib/utils';

const AnimatedBars = ({ className }: { className?: string }) => (
  <div className={cn('equalizer', className)}>
    <span />
    <span />
    <span />
  </div>
);

export default AnimatedBars;
