'use client'

import { m } from 'framer-motion'

import cn from '@/lib/cn'
import { routes } from '@/lib/constants'

import Container from './container'
import {
  ChevronRight,
  Kotlin,
  Laravel,
  NextJs,
  PHP,
  ReactJs,
  Spring,
  TailwindCss,
  TypeScript,
} from './icons'
import Link from './link'

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
      <Link
        href={routes.ABOUT}
        className={cn('button button--rounded button--shadow gap-1')}
      >
        Explore More <ChevronRight />
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
        className={cn(
          'text-sm text-gray-900/60 mb-2',
          'dark:text-slate-100/70',
        )}
      >
        Tech Stack
      </m.p>
      <m.div
        initial="hide"
        animate="show"
        transition={{ delayChildren: 0.5, staggerChildren: 0.015 }}
        className={cn('flex gap-2 flex-wrap')}
      >
        <m.div
          className={cn(
            'transition duration-200 text-gray-900/60 hover:text-[#3178C6]',
            'dark:text-slate-100/70 dark:hover:text-[#3178c6]',
          )}
          title="TypeScript"
          variants={animation}
        >
          <TypeScript className={cn('h-6 w-6')} />
        </m.div>
        <m.div
          className={cn(
            'transition duration-200 text-gray-900/60 hover:text-black',
            'dark:text-slate-100/70 dark:hover:text-white',
          )}
          title="Next.js"
          variants={animation}
        >
          <NextJs className={cn('h-6 w-6')} />
        </m.div>
        <m.div
          className={cn(
            'transition duration-200 text-gray-900/60 hover:text-[#61DAFB]',
            'dark:text-slate-100/70 dark:hover:text-[#61DAFB]',
          )}
          title="React.js"
          variants={animation}
        >
          <ReactJs className={cn('h-6 w-6')} />
        </m.div>
        <m.div
          className={cn(
            'transition duration-200 text-gray-900/60 hover:text-[#06B6D4]',
            'dark:text-slate-100/70 dark:hover:text-[#06B6D4]',
          )}
          title="Tailwind CSS"
          variants={animation}
        >
          <TailwindCss className={cn('h-6 w-6')} />
        </m.div>
        <m.div
          className={cn(
            'transition duration-200 text-gray-900/60 hover:text-[#7F52FF]',
            'dark:text-slate-100/70 dark:hover:text-[#7F52FF]',
          )}
          title="Kotlin"
          variants={animation}
        >
          <Kotlin className={cn('h-6 w-6')} />
        </m.div>
        <m.div
          className={cn(
            'transition duration-200 text-gray-900/60 hover:text-[#6DB33F]',
            'dark:text-slate-100/70 dark:hover:text-[#6DB33F]',
          )}
          title="Spring"
          variants={animation}
        >
          <Spring className={cn('h-6 w-6')} />
        </m.div>
        <m.div
          className={cn(
            'transition duration-200 text-gray-900/60 hover:text-[#777BB4]',
            'dark:text-slate-100/70 dark:hover:text-[#777BB4]',
          )}
          title="PHP"
          variants={animation}
        >
          <PHP className={cn('h-6 w-6')} />
        </m.div>
        <m.div
          className={cn(
            'transition duration-200 text-gray-900/60 hover:text-[#FF2D20]',
            'dark:text-slate-100/70 dark:hover:text-[#FF2D20]',
          )}
          title="Laravel"
          variants={animation}
        >
          <Laravel className={cn('h-6 w-6')} />
        </m.div>
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
          Hi, I'm{' '}
          <span className={cn('text-primary-500')}>Bona Brian Siagian</span>
        </span>
        <span className={cn('')}>Fullstack Engineer</span>
      </m.h1>
      <m.p
        className={cn('text-lg', 'md:text-xl')}
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
