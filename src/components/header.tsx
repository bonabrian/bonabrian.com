'use client'

import { m } from 'framer-motion'

import site from '@/config/site'
import useOnScroll from '@/hooks/use-on-scroll'
import cn from '@/utils/cn'

import Logo from '../../public/static/images/logo.svg'
import MobileNav from './mobile-nav'
import Navbar from './navbar'
import ThemeSwitch from './theme-switch'
import { Container, Link, Separator } from './ui'

const Header = () => {
  const isScrolled = useOnScroll()

  return (
    <m.header
      className={cn(
        'saturate-110 sticky top-0 z-50 flex h-16 bg-background/90 backdrop-blur-[10px]',
        isScrolled ? 'shadow-sm' : '',
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <Container>
        <nav className={cn('flex h-16 flex-1 items-center justify-between')}>
          <div className={cn('flex items-center md:gap-2')}>
            <Link
              href="/"
              className={cn('flex items-center')}
              aria-label={site.author.name}
            >
              <Logo className={cn('h-9')} />
            </Link>
          </div>
          <div className={cn('flex items-center gap-2')}>
            <Navbar />
            <Separator orientation="vertical" className="h-6" />
            <div className={cn('flex items-center gap-1')}>
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </nav>
      </Container>
    </m.header>
  )
}

export default Header
