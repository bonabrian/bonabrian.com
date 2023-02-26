import classnames from 'classnames'
import { useRouter } from 'next/router'

import { navItems } from '@/data'

import Link from './link'

const Navigation = () => {
  const router = useRouter()

  return (
    <nav className="hidden sm:flex sm:gap-6">
      {navItems
        .filter((item) => !item.onlyShowOnDropdownMenu)
        .map(({ path, label }) => (
          <Link
            key={label}
            href={path}
            className={classnames(
              'relative py-1 font-medium after:content-[""] after:absolute after:block after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-500 after:hover:scale-x-100 after:scale-x-0 after:origin-top-left after:transition after:ease-in-out after:duration-300',
              router.pathname === path ? 'after:scale-x-100' : '',
            )}
          >
            {label}
          </Link>
        ))}
    </nav>
  )
}

export default Navigation
