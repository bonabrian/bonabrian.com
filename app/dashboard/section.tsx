'use client';

import { motion, useInView } from 'framer-motion';
import type { JSX } from 'react';
import { useRef } from 'react';

import RenderIf from '@/components/shared/render-if';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SectionProps {
  title: string;
  description: string;
  icon: JSX.Element;
  children: React.ReactNode;
  appendix?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const Section = ({
  title,
  description,
  icon,
  children,
  appendix,
  isLoading,
  className,
}: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.section
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      variants={variants}
      transition={{ duration: 0.5 }}
      className={cn(
        'will-change-[transform, opacity] flex flex-col gap-2',
        className,
      )}
      ref={sectionRef}
    >
      <div
        className={cn('font-cal flex items-center gap-1 text-xl font-medium')}
      >
        {icon}
        <h2 className={cn('capitalize')}>{title}</h2>
      </div>
      <div
        className={cn(
          'flex flex-col justify-between gap-2',
          'md:flex-row md:items-center',
        )}
      >
        <p>{description}</p>
        <RenderIf isTrue={Boolean(appendix)}>{appendix}</RenderIf>
      </div>
      {isLoading ? (
        <div className={cn('grid gap-3 py-2', 'md:grid-cols-3')}>
          <Skeleton className={cn('h-16 w-full')} />
          <Skeleton className={cn('h-16 w-full')} />
          <Skeleton className={cn('h-16 w-full')} />
        </div>
      ) : (
        <>{children}</>
      )}
    </motion.section>
  );
};

export default Section;
