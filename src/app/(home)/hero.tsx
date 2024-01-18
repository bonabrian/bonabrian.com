'use client'

import { m } from 'framer-motion'

import { ChevronRight } from '@/components/icons'
import { Button, Container, Link } from '@/components/ui'
import { ROUTES } from '@/config/links'
import cn from '@/utils/cn'

import TechStack from './tech-stack'

const HeaderTitle = () => {
  const animation = {
    hide: { x: -32, opacity: 0 },
    show: { x: 0, opacity: 1 },
  }

  return (
    <div className={cn('relative font-cal')}>
      <m.h1
        className={cn(
          'mb-4 flex flex-col justify-center gap-1 bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text pb-2 text-4xl font-bold text-transparent',
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
        className={cn(
          'bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text font-bold text-transparent',
          'md:text-xl',
        )}
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
        <Button variant="shadow">
          Explore More <ChevronRight />
        </Button>
      </Link>
    </m.div>
  )
}

const Hero = () => {
  return (
    <div className={cn('bg-pattern py-16', 'lg:py-20')}>
      <Container>
        <HeaderTitle />
        <div className={cn('mt-6', 'md:mt-8')}>
          <CallToAction />
        </div>
        <TechStack />
      </Container>
    </div>
  )
}

export default Hero
