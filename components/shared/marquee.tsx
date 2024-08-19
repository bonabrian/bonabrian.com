import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'up';
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  className?: string;
  loopSize?: number;
}

const Marquee = ({
  children,
  direction = 'left',
  pauseOnHover = false,
  reverse = false,
  fade = false,
  className,
  loopSize = 2,
}: MarqueeProps) => {
  const linearGradientDirectionClass =
    direction === 'left' ? 'to right' : 'to bottom';

  return (
    <div
      className={cn(
        'group flex gap-4 overflow-hidden',
        direction === 'left' ? 'flex-row' : 'flex-col',
        className,
      )}
      style={{
        maskImage: fade
          ? `linear-gradient(${linearGradientDirectionClass}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
        WebkitMaskImage: fade
          ? `linear-gradient(${linearGradientDirectionClass}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
      }}
    >
      {Array.from({ length: loopSize }, (_, index) => (
        <div
          key={index}
          className={cn(
            'flex shrink-0 justify-around gap-4 [--gap:1rem]',
            direction === 'left'
              ? 'animate-marquee-left flex-row'
              : 'animate-marquee-up flex-col',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && 'direction-reverse',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
