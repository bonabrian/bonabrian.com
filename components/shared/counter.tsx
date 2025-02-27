'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

const Counter = ({
  count,
  className,
}: {
  count: number;
  className?: string;
}) => {
  const controls = useAnimationControls();

  useEffect(() => {
    const startMotion = async () => {
      await controls.start({
        y: [-20, 0],
        transition: { duration: 0.15 },
      });
    };

    if (count !== 0) startMotion();
  }, [controls, count]);

  return (
    <div
      className={cn(
        'bg-accent relative flex h-6 items-center gap-1 overflow-hidden rounded-full px-2 py-1',
        className,
      )}
    >
      {count === 0 ? (
        <span
          className={cn(
            'text-accent-foreground flex flex-col font-mono text-sm font-bold',
          )}
        >
          <span className={cn('flex h-5 items-center')}>0</span>
        </span>
      ) : (
        <motion.span
          className={cn(
            'text-accent-foreground flex flex-col font-mono text-sm font-bold',
          )}
          animate={controls}
        >
          <span className={cn('flex h-5 items-center')}>&nbsp;</span>
          <span className={cn('flex h-5 items-center')}>{count}</span>
          <span className={cn('flex h-5 items-center')}>{count - 1}</span>
        </motion.span>
      )}
    </div>
  );
};

export default Counter;
