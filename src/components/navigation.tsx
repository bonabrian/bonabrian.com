'use client'

import { Menu } from '@headlessui/react'
import { m } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/data/app'
import { useOnScroll } from '@/hooks'
import cn from '@/lib/cn'
import { defaultMetadata } from '@/lib/metadata'

import Logo from '../../public/static/images/logo.svg'
import { Hamburger } from './icons'
import ThemeSwitch from './theme-switch'
import { Button, Container, Link } from './ui'

const animation = {
  hide: { opacity: 0, y: 16 },
  show: { opacity: 1, transition: { duration: 0.18 } },
}

const Navigation = () => {
  const isScrolled = useOnScroll()
  const pathname = usePathname()

  return (
    <header
      className={cn(
        'saturate-110 sticky top-0 z-50 flex h-16 bg-background/90 backdrop-blur-[10px]',
        '',
        isScrolled ? 'shadow-sm' : '',
      )}
    >
      <Container wide>
        <nav
          className={cn(
            'flex h-16 flex-1 items-center justify-between text-sm',
          )}
        >
          <div className={cn('flex items-center md:gap-2')}>
            <Link
              href="/"
              aria-label={defaultMetadata.author.name}
              className={cn('flex items-center')}
            >
              <Logo className={cn('h-9')} />
            </Link>
            <ul className={cn('hidden', 'md:flex md:gap-2')}>
              {navLinks
                .filter(({ onlyShowOnDropdownMenu }) => !onlyShowOnDropdownMenu)
                .map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className={cn(
                        'flex items-center gap-1 rounded px-2 py-2 font-semibold text-muted-foreground transition-colors duration-150',
                        'hover:bg-accent hover:text-accent-foreground',
                        (pathname === path || pathname.startsWith(path)) &&
                          'bg-accent text-accent-foreground',
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <ul className={cn('flex items-center')}>
            <li className={cn('md:hidden')}>
              <div className={cn('relative')}>
                <Menu>
                  {({ open }) => (
                    <>
                      <Menu.Button
                        title="Menu"
                        aria-label="Menu"
                        htmlType="button"
                        variant="ghost"
                        className={cn(
                          'flex h-9 w-9 items-center justify-center p-0',
                        )}
                        as={Button}
                      >
                        <Hamburger className={cn('')} />
                      </Menu.Button>
                      {open && (
                        <Menu.Items
                          static
                          as={m.div}
                          variants={animation}
                          initial="hide"
                          animate="show"
                          className={cn(
                            'absolute right-0 w-56 origin-top-right rounded-md bg-popover p-1 shadow-sm',
                          )}
                        >
                          {navLinks.map(({ path, label, icon }) => (
                            <Menu.Item key={path}>
                              {({ active }) => (
                                <Link
                                  href={path}
                                  className={cn(
                                    'mx-1 my-0.5 flex items-center gap-2 rounded px-3 py-2 font-semibold text-muted-foreground transition-colors duration-150',
                                    'hover:bg-accent hover:text-accent-foreground',
                                    active
                                      ? 'bg-accent text-accent-foreground'
                                      : '',
                                  )}
                                >
                                  {icon}
                                  <span>{label}</span>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      )}
                    </>
                  )}
                </Menu>
              </div>
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Navigation
