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

export const STACKS: { [key: string]: JSX.Element } = {
  TypeScript: <TypeScript className="size-5 fill-[#3178C6]" />,
  JavaScript: <JavaScript className="size-5 fill-[#F7DF1E]" />,
  PHP: <PHP className="size-5 fill-[#777BB4]" />,
  Kotlin: <Kotlin className="size-5 fill-[#7F52FF]" />,
  Ruby: <Ruby className="size-5 fill-[#CC342D]" />,
  'Next.js': <NextJS className="size-5 fill-black dark:fill-white" />,
  'React.js': <ReactJS className="size-5 fill-[#61DAFB]" />,
  'Nuxt.js': <NuxtJS className="size-5 fill-[#00DC82]" />,
  'Vue.js': <VueJS className="size-5 fill-[#4FC08D]" />,
  Jest: <Jest className="size-4 fill-[#C21325]" />,
  Laravel: <Laravel className="size-5 fill-[#FF2D20]" />,
  Spring: <Spring className="size-5 fill-[#6DB33F]" />,
  'Ruby on Rails': <RubyOnRails className="size-4 fill-[#D30001]" />,
  'Tailwind CSS': <TailwindCSS className="size-5 fill-[#06B6D4]" />,
  MDX: <MDX className="size-5 fill-black dark:fill-white" />,
  MySQL: <MySQL className="size-5 fill-[#4479A1]" />,
  PostgreSQL: <PostgreSQL className="size-5 fill-[#4169E1]" />,
  Redis: <Redis className="size-5 fill-[#FF4438]" />,
  Prisma: <Prisma className="size-5 fill-[##2D3748] dark:fill-white" />,
  RabbitMQ: <RabbitMQ className="size-5 fill-[#FF6600]" />,
  Git: <Git className="size-5 fill-[#F05032]" />,
  JQuery: <JQuery className="size-5 fill-[#3FCF8E]" />,
  Bootstrap: <Bootstrap className="size-5 fill-[#7952B3]" />,
  Supabase: <Supabase className="size-5 fill-[#3FCF83]" />,
  Android: <Android className="size-5 fill-[#34A853]" />,
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
