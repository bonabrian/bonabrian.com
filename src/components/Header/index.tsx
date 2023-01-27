import { useEffect, useState } from 'react'

import { defaultSeo } from '@/config'

import Link from '../Link'
import DropdownMenu from './DropdownMenu'
import Navigation from './Navigation'

const useScrollTop = () => {
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setIsTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isTop
}

const Header = () => {
  const isTop = useScrollTop()

  return (
    <header
      className={`${
        isTop ? 'border-none' : 'border-b border-gray-100 dark:border-gray-900'
      } w-full sticky z-20 top-0 items-center flex justify-between py-4 bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-30 backdrop-filter backdrop-saturate-150 backdrop-blur-lg firefox:bg-opacity-100 dark:firefox:bg-opacity-100`}
    >
      <div className="flex items-center justify-between w-full max-w-2xl px-4 mx-auto sm:px-6 sm:py-2 xl:max-w-3xl xl:px-0">
        <Link href="/" aria-label={defaultSeo.author}>
          <div className="text-primary-color dark:text-primary-color-dark flex items-center justify-between text-xl font-bold">
            b.
          </div>
        </Link>
        <div className="flex items-center text-base leading-5">
          <Navigation />
          <DropdownMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
