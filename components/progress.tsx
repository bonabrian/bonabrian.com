'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

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

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="w-24">{name}</div>
      <div className="bg-muted relative flex h-3 flex-1 justify-center rounded-full">
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
      <div className="w-8 text-right">{percent.toFixed(0)}%</div>
    </div>
  );
};

export default Progress;
