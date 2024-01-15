'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV_LINKS } from '@/config/links'
import cn from '@/utils/cn'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <div className={cn('hidden', 'md:flex')}>
      <ul className={cn('flex md:gap-1')}>
        {NAV_LINKS.filter(
          ({ onlyShowOnDropdownMenu }) => !onlyShowOnDropdownMenu,
        ).map(({ path, label }) => {
          const isActive = pathname === path || pathname.startsWith(path)

          return (
            <li key={path} className={cn('relative')}>
              <Link
                href={path}
                className={cn(
                  'flex items-center rounded px-3 py-2 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Navbar
