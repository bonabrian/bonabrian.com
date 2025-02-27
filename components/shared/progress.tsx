'use client';

import { motion } from 'framer-motion';

import useMounted from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';

import RenderIf from './render-if';

const Progress = ({
  data,
  className,
}: {
  data: { name: string; percent?: number };
  className?: string;
}) => {
  const { name, percent = 0 } = data;

  const variants = {
    initial: { width: 0 },
    animate: {
      width: `${percent}%`,
      transition: { delay: 0.8 },
    },
  };

  const isMounted = useMounted();

  return (
    <RenderIf isTrue={isMounted}>
      <div className={cn('flex items-center justify-between gap-3')}>
        <div className={cn('w-24')}>{name}</div>
        <div
          className={cn(
            'bg-muted relative flex h-3 flex-1 justify-center rounded-full',
          )}
        >
          <motion.span
            initial="initial"
            animate="animate"
            variants={variants}
            className={cn(
              'absolute top-0 left-0 h-3 rounded-full px-3',
              className,
            )}
          >
            &ensp;
          </motion.span>
        </div>
        <div className={cn('w-8 text-right')}>{percent.toFixed(0)}%</div>
      </div>
    </RenderIf>
  );
};

export default Progress;
