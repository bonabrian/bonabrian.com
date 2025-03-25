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
  ReactJS,
  Spring,
  TailwindCSS,
  TypeScript,
  VueJS,
} from '@/components/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Stack {
  title: string;
  className: string;
  icon: JSX.Element;
}

const stacks: Stack[] = [
  {
    title: 'TypeScript',
    className: 'hover:text-[#3178C6]',
    icon: <TypeScript />,
  },
  {
    title: 'JavaScript',
    className: 'hover:text-[#F7DF1E]',
    icon: <JavaScript />,
  },
  {
    title: 'PHP',
    className: 'hover:text-[#777BB4]',
    icon: <PHP />,
  },
  {
    title: 'Kotlin',
    className: 'hover:text-[#7F52FF]',
    icon: <Kotlin />,
  },
  {
    title: 'Next.js',
    className: 'hover:text-black dark:hover:text-white',
    icon: <NextJS />,
  },
  {
    title: 'React.js',
    className: 'hover:text-[#61DAFB]',
    icon: <ReactJS />,
  },
  {
    title: 'Nuxt.js',
    className: 'hover:text-[#00DC82]',
    icon: <NuxtJS />,
  },
  {
    title: 'Vue.js',
    className: 'hover:text-[#4FC08D]',
    icon: <VueJS />,
  },
  {
    title: 'Laravel',
    className: 'hover:text-[#FF2D20]',
    icon: <Laravel />,
  },
  {
    title: 'Spring',
    className: 'hover:text-[#6DB33F]',
    icon: <Spring />,
  },
  {
    title: 'Tailwind CSS',
    className: 'hover:text-[#06B6D4]',
    icon: <TailwindCSS />,
  },
  {
    title: 'MySQL',
    className: 'hover:text-[#4479A1]',
    icon: <MySQL />,
  },
  {
    title: 'PostgreSQL',
    className: 'hover:text-[#4169E1]',
    icon: <PostgreSQL />,
  },
];

const animation = {
  hide: { x: -8, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { staggerChildren: 0.1 } },
};

const CurrentTechStack = () => {
  return (
    <>
      <motion.p
        initial="hide"
        animate="show"
        variants={animation}
        transition={{ delay: 0.2 }}
        className="font-cal mb-2 text-sm"
      >
        Tech stack
      </motion.p>
      <motion.div
        initial="hide"
        animate="show"
        variants={animation}
        className="flex flex-wrap gap-2 md:gap-3"
      >
        {stacks.map(({ title, className, icon }) => (
          <Tooltip key={title}>
            <TooltipTrigger asChild>
              <motion.div
                className={cn(
                  'text-muted-foreground size-5 rounded-md transition-transform duration-200 hover:scale-110 md:size-6',
                  className,
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
