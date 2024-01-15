'use client'

import { Menu } from '@headlessui/react'
import { m } from 'framer-motion'
import Link from 'next/link'

import { NAV_LINKS } from '@/config/links'
import cn from '@/utils/cn'

import { Hamburger } from './icons'
import { Button } from './ui'

const animation = {
  hide: { opacity: 0, y: 16 },
  show: { opacity: 1, transition: { duration: 0.18 } },
}

const MobileNav = () => {
  return (
    <div className={cn('flex', 'md:hidden')}>
      <div className={cn('flex items-center text-sm')}>
        <div className={cn('relative')}>
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button
                  title="Menu"
                  aria-label="Menu"
                  htmlType="button"
                  variant="ghost"
                  className={cn('flex h-9 w-9 items-center justify-center p-0')}
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
                      'absolute right-0 w-56 origin-top-right rounded-md border border-border bg-popover p-1',
                    )}
                  >
                    {NAV_LINKS.map(({ path, label, icon }) => (
                      <Menu.Item key={path}>
                        {({ active }) => (
                          <Link
                            href={path}
                            className={cn(
                              'mx-1 my-0.5 flex items-center gap-2 rounded px-2 py-1.5 font-semibold text-muted-foreground transition-colors duration-150',
                              'hover:bg-accent hover:text-accent-foreground',
                              active ? 'bg-accent text-accent-foreground' : '',
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
      </div>
    </div>
  )
}

export default MobileNav
