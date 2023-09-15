'use client'

import { Menu } from '@headlessui/react'
import { m } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { useOnScroll } from '@/hooks'
import cn from '@/lib/cn'
import { routes } from '@/lib/constants'
import { defaultMetadata } from '@/lib/metadata'

import Logo from '../../assets/images/logo.svg'
import Container from './container'
import {
  AtSign,
  BarChart,
  Check,
  CodeBracket,
  Hamburger,
  Home,
  Layers,
  Pencil,
} from './icons'
import Link from './link'
import ThemeSwitch from './theme-switch'
import { Button } from './ui'

interface NavLink {
  path: string
  label: string
  icon: JSX.Element
  onlyShowOnDropdownMenu?: boolean
}

const navLinks: NavLink[] = [
  {
    path: '/',
    label: 'Home',
    icon: <Home />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: routes.BLOG,
    label: 'Blog',
    icon: <Pencil />,
  },
  {
    path: routes.PROJECTS,
    label: 'Projects',
    icon: <Layers />,
  },
  {
    path: routes.SNIPPETS,
    label: 'Snippets',
    icon: <CodeBracket />,
  },
  {
    path: routes.ENDORSEMENTS,
    label: 'Endorsements',
    icon: <Check />,
  },
  {
    path: routes.ABOUT,
    label: 'About',
    icon: <AtSign />,
  },
  {
    path: routes.STATS,
    label: 'Stats',
    icon: <BarChart />,
    onlyShowOnDropdownMenu: true,
  },
]

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
        'sticky top-0 z-50 h-16 bg-background/90 flex saturate-110 backdrop-blur-[10px]',
        '',
        isScrolled ? 'shadow-sm' : '',
      )}
    >
      <Container wide>
        <nav
          className={cn(
            'flex flex-1 items-center justify-between h-16 text-sm',
          )}
        >
          <div className={cn('flex md:gap-2 items-center')}>
            <Link
              href="/"
              aria-label={defaultMetadata.author.name}
              className={cn('flex items-center px-2')}
            >
              <Logo className={cn('h-9')} />
            </Link>
            <ul className={cn('hidden sm:flex md:gap-1')}>
              {navLinks
                .filter(({ onlyShowOnDropdownMenu }) => !onlyShowOnDropdownMenu)
                .map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className={cn(
                        'nav-link',
                        (pathname === path || pathname.startsWith(path)) &&
                          'active',
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <ul className={cn('flex items-center')}>
            <li className={cn('sm:hidden')}>
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
                          'w-9 h-9 p-0 flex items-center justify-center',
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
                            'absolute bg-popover shadow-sm p-1 rounded-md w-56 right-0 origin-top-right',
                          )}
                        >
                          {navLinks.map(({ path, label, icon }) => (
                            <Menu.Item key={path}>
                              {({ active }) => (
                                <Link
                                  href={path}
                                  className={cn(
                                    'nav-link gap-2 my-0.5',
                                    active ? 'active' : '',
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
