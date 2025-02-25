import type { JSX } from 'react';

import {
  Android,
  Bootstrap,
  FramerMotion,
  Git,
  JavaScript,
  Jest,
  JQuery,
  Kotlin,
  Laravel,
  MDX,
  MySQL,
  NextJS,
  NuxtJS,
  PHP,
  PostgreSQL,
  Prisma,
  RabbitMQ,
  ReactJS,
  Redis,
  Ruby,
  RubyOnRails,
  ShadcnUI,
  Spring,
  Supabase,
  TailwindCSS,
  TypeScript,
  Vercel,
  VueJS,
} from '@/components/shared/icons';
import { cn } from '@/lib/utils';
import type { Stack } from '@/types/stack';

export const STACKS: Stack = {
  TypeScript: <TypeScript className={cn('size-4 fill-[#3178C6]')} />,
  JavaScript: <JavaScript className={cn('size-4 fill-[#F7DF1E]')} />,
  PHP: <PHP className={cn('size-4 fill-[#777BB4]')} />,
  Kotlin: <Kotlin className={cn('size-4 fill-[#7F52FF]')} />,
  Ruby: <Ruby className={cn('size-4 fill-[#CC342D]')} />,
  'Next.js': <NextJS className={cn('size-4 fill-black', 'dark:fill-white')} />,
  'React.js': <ReactJS className={cn('size-4 fill-[#61DAFB]')} />,
  'Nuxt.js': <NuxtJS className={cn('size-4 fill-[#00DC82]')} />,
  'Vue.js': <VueJS className={cn('size-4 fill-[#4FC08D]')} />,
  Laravel: <Laravel className={cn('size-4 fill-[#FF2D20]')} />,
  Spring: <Spring className={cn('size-4 fill-[#6DB33F]')} />,
  'Ruby on Rails': <RubyOnRails className={cn('size-4 fill-[#D30001]')} />,
  'Tailwind CSS': <TailwindCSS className={cn('size-4 fill-[#06B6D4]')} />,
  MDX: <MDX className={cn('size-4 fill-black', 'dark:fill-white')} />,
  MySQL: <MySQL className={cn('size-4 fill-[#4479A1]')} />,
  PostgreSQL: <PostgreSQL className={cn('size-4 fill-[#4169E1]')} />,
  Redis: <Redis className={cn('size-4 fill-[#FF4438]')} />,
  Prisma: (
    <Prisma className={cn('size-4 fill-[##2D3748]', 'dark:fill-white')} />
  ),
  RabbitMQ: <RabbitMQ className={cn('size-4 fill-[#FF6600]')} />,
  Jest: <Jest className={cn('size-4 fill-[#C21325]')} />,
  Git: <Git className={cn('size-4 fill-[#F05032]')} />,
  Supabase: <Supabase className={cn('size-4 fill-[#3FCF8E]')} />,
  JQuery: <JQuery className={cn('size-4 fill-[#0769AD]')} />,
  Bootstrap: <Bootstrap className={cn('size-4 fill-[#7952B3]')} />,
  Android: <Android className={cn('size-4 fill-[#34A853]')} />,
};

export const CORE_STACKS: {
  name: string;
  icon: JSX.Element;
  link: string;
}[] = [
  { name: 'Next.js', icon: <NextJS />, link: 'https://nextjs.org' },
  { name: 'React.js', icon: <ReactJS />, link: 'https://react.dev' },
  {
    name: 'Tailwind CSS',
    icon: <TailwindCSS />,
    link: 'https://tailwindcss.com',
  },
  { name: 'MDX', icon: <MDX />, link: 'https://mdxjs.com' },
  {
    name: 'Framer Motion',
    icon: <FramerMotion />,
    link: 'https://www.framer.com/motion',
  },
  {
    name: 'TypeScript',
    icon: <TypeScript />,
    link: 'https://www.typescriptlang.org',
  },
  {
    name: 'Vercel',
    icon: <Vercel />,
    link: 'https://vercel.com',
  },
  {
    name: 'shadcn/ui',
    icon: <ShadcnUI />,
    link: 'https://ui.shadcn.com',
  },
  {
    name: 'Prisma',
    icon: <Prisma />,
    link: 'https://www.prisma.io',
  },
];
