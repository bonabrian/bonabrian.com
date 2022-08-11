import siteMetadata from '@/data/siteMetadata'

import Link from './Link'

const Footer = () => {
  return (
    <footer>
      <div className='flex flex-col items-center pb-8'>
        <nav className='flex flex-col justify-between w-full max-w-2xl gap-4 mx-auto mt-4 xl:max-w-3xl sm:gap-0 sm:flex-row'>
          <div className='flex flex-col space-y-4 md:items-start'>
            <p className='text-sm font-bold'>Writing</p>
            <Link
              href='/blog'
              className='text-sm hover:text-primary-600 dark:hover:text-primary-400'
            >
              Blog
            </Link>
            <Link
              href='/tags'
              className='text-sm hover:text-primary-600 dark:hover:text-primary-400'
            >
              Tags
            </Link>
          </div>

          <div className='flex flex-col space-y-4 md:items-start'>
            <p className='text-sm font-bold'>Showcase</p>
            <Link
              href='/endorsements'
              className='text-sm hover:text-primary-600 dark:hover:text-primary-400'
            >
              Endorsements
            </Link>
            <Link
              href='/guestbook'
              className='text-sm hover:text-primary-600 dark:hover:text-primary-400'
            >
              Guestbook
            </Link>
          </div>

          <div className='flex flex-col space-y-4 md:items-start'>
            <p className='text-sm font-bold'>Social</p>
            <Link
              href={siteMetadata.github}
              className='text-sm hover:text-primary-600 dark:hover:text-primary-400'
            >
              Github
            </Link>
            <Link
              href={siteMetadata.linkedin}
              className='text-sm hover:text-primary-600 dark:hover:text-primary-400'
            >
              LinkedIn
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
