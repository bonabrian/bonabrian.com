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
  TypeScript: <TypeScript className={cn('text-[#3178C6] w-6 h-6')} />,
  JavaScript: <JavaScript className={cn('text-[#F7DF1E] w-6 h-6')} />,
  'Next.js': <NextJs className={cn('text-black dark:text-white w-6 h-6')} />,
  'React.js': <ReactJs className={cn('text-[#61DAFB] w-6 h-6')} />,
  'Vue.js': <VueJs className={cn('text-[#4FC08D] w-6 h-6')} />,
  JQuery: <JQuery className={cn('text-[#0769AD] w-6 h-6')} />,
  TailwindCSS: <TailwindCss className={cn('text-[#06B6D4] w-6 h-6')} />,
  Bootstrap: <Bootstrap className={cn('text-[#7952B3] w-6 h-6')} />,
  Prisma: <Prisma className={cn('text-[#2D3748] dark:text-white w-6 h-6')} />,
  PlanetScale: (
    <PlanetScale className={cn('text-black dark:text-white w-6 h-6')} />
  ),
  PHP: <PHP className={cn('text-[#777BB4] w-6 h-6')} />,
  Laravel: <Laravel className={cn('text-[#FF2D20] w-6 h-6')} />,
  Redis: <Redis className={cn('text-[#DC382D] w-6 h-6')} />,
  Kotlin: <Kotlin className={cn('text-[#7F52FF] w-6 h-6')} />,
  Android: <Android className={cn('text-[#3DDC84] w-6 h-6')} />,
}
