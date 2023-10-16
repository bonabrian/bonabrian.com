import {
  Android,
  Bootstrap,
  JavaScript,
  JQuery,
  Kotlin,
  Laravel,
  NextJs,
  PHP,
  PlanetScale,
  Prisma,
  ReactJs,
  Redis,
  TailwindCss,
  TypeScript,
  VueJs,
} from '@/components/icons'
import cn from '@/lib/cn'

interface StackProps {
  [key: string]: JSX.Element
}

export const STACKS: StackProps = {
  TypeScript: <TypeScript className={cn('h-6 w-6 text-[#3178C6]')} />,
  JavaScript: <JavaScript className={cn('h-6 w-6 text-[#F7DF1E]')} />,
  'Next.js': <NextJs className={cn('h-6 w-6 text-black dark:text-white')} />,
  'React.js': <ReactJs className={cn('h-6 w-6 text-[#61DAFB]')} />,
  'Vue.js': <VueJs className={cn('h-6 w-6 text-[#4FC08D]')} />,
  JQuery: <JQuery className={cn('h-6 w-6 text-[#0769AD]')} />,
  TailwindCSS: <TailwindCss className={cn('h-6 w-6 text-[#06B6D4]')} />,
  Bootstrap: <Bootstrap className={cn('h-6 w-6 text-[#7952B3]')} />,
  Prisma: <Prisma className={cn('h-6 w-6 text-[#2D3748] dark:text-white')} />,
  PlanetScale: (
    <PlanetScale className={cn('h-6 w-6 text-black dark:text-white')} />
  ),
  PHP: <PHP className={cn('h-6 w-6 text-[#777BB4]')} />,
  Laravel: <Laravel className={cn('h-6 w-6 text-[#FF2D20]')} />,
  Redis: <Redis className={cn('h-6 w-6 text-[#DC382D]')} />,
  Kotlin: <Kotlin className={cn('h-6 w-6 text-[#7F52FF]')} />,
  Android: <Android className={cn('h-6 w-6 text-[#3DDC84]')} />,
}
