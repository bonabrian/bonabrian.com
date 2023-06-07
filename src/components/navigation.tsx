'use client'

import { Menu } from '@headlessui/react'
import cx from 'classnames'
import { m } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { IconType } from 'react-icons'
import { BsCodeSquare } from 'react-icons/bs'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import {
  RiGitBranchLine,
  RiHomeLine,
  RiMenuFill,
  RiPencilLine,
  RiUserLine,
} from 'react-icons/ri'
import { SiSimpleanalytics } from 'react-icons/si'

import { useOnScroll } from '@/hooks'
import { routes } from '@/lib/constants'
import { defaultMetadata } from '@/lib/metadata'

import Logo from '../../assets/images/logo.svg'
import Container from './container'
import Link from './link'
import ThemeSwitch from './theme-switch'

interface NavLink {
  path: string
  label: string
  icon: IconType
  onlyShowOnDropdownMenu?: boolean
}

const navLinks: NavLink[] = [
  {
    path: '/',
    label: 'Home',
    icon: RiHomeLine,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: routes.BLOG,
    label: 'Blog',
    icon: RiPencilLine,
  },
  {
    path: routes.PROJECTS,
    label: 'Projects',
    icon: RiGitBranchLine,
  },
  {
    path: routes.SNIPPETS,
    label: 'Snippets',
    icon: BsCodeSquare,
  },
  {
    path: routes.ENDORSEMENTS,
    label: 'Endorsements',
    icon: HiOutlineBadgeCheck,
  },
  {
    path: routes.ABOUT,
    label: 'About',
    icon: RiUserLine,
  },
  {
    path: routes.STATS,
    label: 'Stats',
    icon: SiSimpleanalytics,
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
      className={cx(
        'sticky top-0 z-50 h-16 bg-white/90 flex backdrop-blur',
        'dark:bg-gray-900/90',
        isScrolled ? 'shadow-sm' : '',
      )}
    >
      <Container wide>
        <div
          className={cx(
            'flex flex-1 items-center justify-between h-16 text-sm',
          )}
        >
          <nav className={cx('flex md:gap-2 items-center')}>
            <Link
              href="/"
              aria-label={defaultMetadata.author.name}
              className={cx('flex items-center px-2')}
            >
              <Logo className="h-9" />
            </Link>
            <ul className={cx('hidden sm:flex md:gap-2')}>
              {navLinks
                .filter(({ onlyShowOnDropdownMenu }) => !onlyShowOnDropdownMenu)
                .map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className={cx(
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
          </nav>
          <ul className={cx('flex items-center')}>
            <li className={cx('sm:hidden')}>
              <div className={cx('relative')}>
                <Menu>
                  {({ open }) => (
                    <>
                      <Menu.Button
                        title="Menu"
                        aria-label="Menu"
                        className={cx('flex items-center justify-center')}
                      >
                        <RiMenuFill size={20} />
                      </Menu.Button>
                      {open && (
                        <Menu.Items
                          static
                          as={m.div}
                          variants={animation}
                          initial="hide"
                          animate="show"
                          className={cx(
                            'absolute bg-white shadow p-2 rounded-2xl w-56 right-0 origin-top-right',
                            'dark:bg-gray-800',
                          )}
                        >
                          {navLinks.map(({ path, label, icon: Icon }) => (
                            <Menu.Item key={path}>
                              {({ active }) => (
                                <Link
                                  href={path}
                                  className={cx(
                                    'nav-link gap-2 my-2',
                                    active ? 'active' : '',
                                  )}
                                >
                                  <Icon />
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
        </div>
      </Container>
    </header>
  )
}

export default Navigation
