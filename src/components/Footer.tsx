import ThemeSwitch from '@/components/ThemeSwitch'
import { defaultSeo, socialLinks } from '@/config'

import Link from './Link'
import { NowPlaying } from './NowPlaying'

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col items-center pb-8">
        <nav className="flex flex-col justify-between w-full max-w-2xl gap-4 pb-8 mx-auto mt-4 xl:max-w-3xl sm:gap-0 sm:flex-row">
          <div className="flex flex-col space-y-4 md:items-start">
            <Link
              href="/projects"
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
            >
              About
            </Link>
          </div>

          <div className="flex flex-col space-y-4 md:items-start">
            <Link
              href="/blog"
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
            >
              Blog
            </Link>
            <Link
              href="/snippets"
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
            >
              Snippets
            </Link>
          </div>

          <div className="flex flex-col space-y-4 md:items-start">
            <Link
              href="/endorsements"
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
            >
              Endorsements
            </Link>
            <Link
              href="/stats"
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
            >
              Stats
            </Link>
          </div>

          <div className="flex flex-col space-y-4 md:items-start">
            <Link
              href={socialLinks.github}
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
            >
              Github
            </Link>
            <Link
              href={socialLinks.linkedin}
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
            >
              LinkedIn
            </Link>
          </div>
        </nav>
        <div className="flex justify-between w-full">
          <div className="w-full truncate">
            <NowPlaying />
            <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div>Copyright</div>
              <div>{`© ${new Date().getFullYear()}`}</div>
              <Link
                href="/"
                className="text-black dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
              >
                {defaultSeo.author}
              </Link>
            </div>
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}

export default Footer
