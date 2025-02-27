'use client';

import { motion } from 'framer-motion';
import type { JSX } from 'react';

import {
  JavaScript,
  Kotlin,
  Laravel,
  MySQL,
  NextJS,
  NuxtJS,
  PHP,
  PostgreSQL,
  RabbitMQ,
  ReactJS,
  Redis,
  Spring,
  TailwindCSS,
  TypeScript,
  VueJS,
} from '@/components/shared/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Stack {
  title: string;
  colorClass: string;
  icon: JSX.Element;
}

const stacks: Stack[] = [
  {
    title: 'TypeScript',
    colorClass: 'hover:text-[#3178C6]',
    icon: <TypeScript />,
  },
  {
    title: 'JavaScript',
    colorClass: 'hover:text-[#F7DF1E]',
    icon: <JavaScript />,
  },
  {
    title: 'PHP',
    colorClass: 'hover:text-[#777BB4]',
    icon: <PHP />,
  },
  {
    title: 'Kotlin',
    colorClass: 'hover:text-[#7F52FF]',
    icon: <Kotlin />,
  },
  {
    title: 'Next.js',
    colorClass: 'hover:text-black dark:hover:text-white',
    icon: <NextJS />,
  },
  {
    title: 'React.js',
    colorClass: 'hover:text-[#61DAFB]',
    icon: <ReactJS />,
  },
  {
    title: 'Nuxt.js',
    colorClass: 'hover:text-[#00DC82]',
    icon: <NuxtJS />,
  },
  {
    title: 'Vue.js',
    colorClass: 'hover:text-[#4FC08D]',
    icon: <VueJS />,
  },
  {
    title: 'Laravel',
    colorClass: 'hover:text-[#FF2D20]',
    icon: <Laravel />,
  },
  {
    title: 'Spring',
    colorClass: 'hover:text-[#6DB33F]',
    icon: <Spring />,
  },
  {
    title: 'Tailwind CSS',
    colorClass: 'hover:text-[#06B6D4]',
    icon: <TailwindCSS />,
  },
  {
    title: 'MySQL',
    colorClass: 'hover:text-[#4479A1]',
    icon: <MySQL />,
  },
  {
    title: 'PostgreSQL',
    colorClass: 'hover:text-[#4169E1]',
    icon: <PostgreSQL />,
  },
  {
    title: 'Redis',
    colorClass: 'hover:text-[#FF4438]',
    icon: <Redis />,
  },
  {
    title: 'RabbitMQ',
    colorClass: 'hover:text-[#FF6600]',
    icon: <RabbitMQ />,
  },
];

const CurrentTechStack = () => {
  const animation = {
    hide: { x: -8, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  return (
    <>
      <motion.p
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.4 }}
        className={cn('text-muted-foreground mb-2 text-sm')}
      >
        Tech stack and tools
      </motion.p>
      <motion.div
        initial="hide"
        animate="show"
        transition={{ delayChildren: 0.5, staggerChildren: 0.015 }}
        className={cn('flex flex-wrap gap-2')}
      >
        {stacks.map(({ title, colorClass, icon }) => (
          <Tooltip key={title}>
            <TooltipTrigger asChild>
              <motion.div
                className={cn(
                  'text-muted-foreground size-6 transition duration-200',
                  colorClass,
                )}
                variants={animation}
              >
                {icon}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </>
  );
};

export default CurrentTechStack;
