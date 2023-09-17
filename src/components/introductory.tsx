'use client'

import { m } from 'framer-motion'

import { ROUTES } from '@/constants/links'
import cn from '@/lib/cn'

import { Button, Container, Tooltip } from './common'
import {
  ChevronRight,
  JavaScript,
  Kotlin,
  Laravel,
  MySQL,
  NextJs,
  PHP,
  RabbitMq,
  ReactJs,
  Redis,
  Spring,
  TailwindCss,
  TypeScript,
  VueJs,
} from './icons'
import Link from './link'

interface Stack {
  title: string
  colorClass: string
  icon: JSX.Element
}

const stack: Stack[] = [
  {
    title: 'TypeScript',
    colorClass: 'hover:text-[#3178C6]',
    icon: <TypeScript className={cn('w-6 h-6')} />,
  },
  {
    title: 'Next.js',
    colorClass: 'hover:text-black dark:hover:text-white',
    icon: <NextJs className={cn('w-6 h-6')} />,
  },
  {
    title: 'React.js',
    colorClass: 'hover:text-[#61DAFB]',
    icon: <ReactJs className={cn('w-6 h-6')} />,
  },
  {
    title: 'Javascript',
    colorClass: 'hover:text-[#F7DF1E]',
    icon: <JavaScript className={cn('w-6 h-6')} />,
  },
  {
    title: 'Vue.js',
    colorClass: 'hover:text-[#4FC08D]',
    icon: <VueJs className={cn('w-6 h-6')} />,
  },
  {
    title: 'Tailwind CSS',
    colorClass: 'hover:text-[#06B6D4]',
    icon: <TailwindCss className={cn('w-6 h-6')} />,
  },
  {
    title: 'Kotlin',
    colorClass: 'hover:text-[#7F52FF]',
    icon: <Kotlin className={cn('w-6 h-6')} />,
  },
  {
    title: 'Spring',
    colorClass: 'hover:text-[#6DB33F]',
    icon: <Spring className={cn('w-6 h-6')} />,
  },
  {
    title: 'PHP',
    colorClass: 'hover:text-[#777BB4]',
    icon: <PHP className={cn('w-6 h-6')} />,
  },
  {
    title: 'Laravel',
    colorClass: 'hover:text-[#FF2D20]',
    icon: <Laravel className={cn('w-6 h-6')} />,
  },
  {
    title: 'Redis',
    colorClass: 'hover:text-[#DC382D]',
    icon: <Redis className={cn('w-6 h-6')} />,
  },
  {
    title: 'RabbitMQ',
    colorClass: 'hover:text-[#FF6600]',
    icon: <RabbitMq className={cn('w-6 h-6')} />,
  },
  {
    title: 'MySQL',
    colorClass: 'hover:text-[#4479A1]',
    icon: <MySQL className={cn('w-6 h-6')} />,
  },
]

const CallToAction = () => {
  const animation = {
    hide: { x: -16, opacity: 0 },
    show: { x: 0, opacity: 1 },
  }

  return (
    <m.div
      className={cn('relative')}
      initial={animation.hide}
      animate={animation.show}
      transition={{ delay: 0.3 }}
    >
      <Link href={ROUTES.about}>
        <Button variant="outline">
          Explore More <ChevronRight />
        </Button>
      </Link>
    </m.div>
  )
}

const TechStack = () => {
  const animation = {
    hide: { x: -8, opacity: 0 },
    show: { x: 0, opacity: 1 },
  }

  return (
    <div>
      <m.p
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.4 }}
        className={cn('text-sm text-secondary-foreground mb-2')}
      >
        Tech Stack and Tools
      </m.p>
      <m.div
        initial="hide"
        animate="show"
        transition={{ delayChildren: 0.5, staggerChildren: 0.015 }}
        className={cn('flex gap-2 flex-wrap')}
      >
        {stack.map(({ title, colorClass, icon }) => (
          <Tooltip key={title} title={title}>
            <m.div
              className={cn(
                'transition duration-200 text-muted-foreground',
                colorClass,
              )}
              variants={animation}
            >
              {icon}
            </m.div>
          </Tooltip>
        ))}
      </m.div>
    </div>
  )
}

const HeaderTitle = () => {
  const animation = {
    hide: { x: -32, opacity: 0 },
    show: { x: 0, opacity: 1 },
  }

  return (
    <div className={cn('relative')}>
      <m.h1
        className={cn(
          'flex flex-col justify-center gap-1 text-4xl tracking-tight font-black mb-4',
          'sm:text-5xl',
          'lg:text-6xl',
        )}
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        <span>
          Hi, I'm <span className={cn('text-primary')}>Bona Brian Siagian</span>
        </span>
        <span>Fullstack Engineer</span>
      </m.h1>
      <m.p
        className={cn('md:text-xl')}
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.2 }}
      >
        I like to build interactive things with code. I also talk and write
        about those things.
      </m.p>
    </div>
  )
}

const Introductory = () => {
  return (
    <div className={cn('bg-pattern py-20', 'lg:pt-36 lg:pb-28')}>
      <Container>
        <HeaderTitle />
        <div className={cn('mt-6', 'md:mt-8')}>
          <CallToAction />
        </div>
        <div className={cn('mt-20', 'lg:mt-32')}>
          <TechStack />
        </div>
      </Container>
    </div>
  )
}

export default Introductory
