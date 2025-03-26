'use client';

import { motion, useInView } from 'framer-motion';
import type { JSX } from 'react';
import { useRef } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface BlockProps {
  title: string;
  description: string;
  icon: JSX.Element;
  children: React.ReactNode;
  appendix?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const Block = ({
  title,
  description,
  icon,
  children,
  appendix,
  isLoading,
  className,
}: BlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(blockRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex flex-col gap-2 will-change-[transform,opacity]',
        className,
      )}
      ref={blockRef}
    >
      <div className="font-cal flex items-center gap-1 text-xl">
        {icon}
        <h2 className="capitalize">{title}</h2>
      </div>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <p>{description}</p>
        {appendix}
      </div>
      {isLoading ? (
        <div className="grid gap-3 py-2 md:grid-cols-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <>{children}</>
      )}
    </motion.div>
  );
};

export default Block;
