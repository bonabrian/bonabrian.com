import { useRouter } from 'next/router'

import navItems from '@/data/navItems'

import Link from '../Link'

const Navigation = () => {
  const router = useRouter()

  return (
    <nav className='hidden sm:block'>
      {navItems
        .filter((x) => !x.onlyOnDropdownMenu)
        .map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className={`
            ${router.pathname === href ? 'active' : ''} link link-underline mx-4
          `}
          >
            {label}
          </Link>
        ))}
    </nav>
  )
}

export default Navigation
