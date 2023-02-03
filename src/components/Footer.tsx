import { RiGithubLine, RiLinkedinLine, RiRssLine } from 'react-icons/ri'

import { routePaths, siteMetadata } from '@/data'

import Link from './Link'
import NowPlaying from './NowPlaying'
import ThemeSwitch from './ThemeSwitch'

const footerLinks = [
  [
    {
      title: 'Projects',
      url: routePaths.PROJECTS,
    },
    {
      title: 'About',
      url: routePaths.ABOUT,
    },
  ],
  [
    {
      title: 'Blog',
      url: routePaths.BLOG,
    },
    {
      title: 'Snippets',
      url: routePaths.SNIPPETS,
    },
  ],
  [
    {
      title: 'Endorsements',
      url: routePaths.ENDORSEMENTS,
    },
    {
      title: 'Stats',
      url: routePaths.STATS,
    },
  ],
]

const iconLinks = [
  {
    title: 'Github',
    url: siteMetadata.github,
    icon: RiGithubLine,
  },
  {
    title: 'LinkedIn',
    url: siteMetadata.linkedin,
    icon: RiLinkedinLine,
  },
  {
    title: 'RSS Feed',
    url: '/feed.xml',
    icon: RiRssLine,
  },
]

const Footer = () => {
  return (
    <footer className="py-8 text-sm border-t dark:border-gray-800 max-w-6xl mx-auto px-4">
      <nav className="flex flex-col justify-between sm:items-center gap-6 sm:gap-4 w-full sm:flex-row mb-4 text-gray-900/50 dark:text-white/60">
        {footerLinks.map((groups, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex flex-col space-y-4 md:items-start">
            {groups.map(({ title, url }) => (
              <Link
                key={title}
                href={url}
                className="hover:text-primary-500 transition-all ease-in-out duration-150"
              >
                {title}
              </Link>
            ))}
          </div>
        ))}
        <div className="flex flex-row gap-4">
          {iconLinks.map(({ title, url, icon: Icon }) => (
            <Link
              key={title}
              href={url}
              showExternalLinkIcon={false}
              title={title}
            >
              <Icon
                size={24}
                className="text-gray-900 dark:text-slate-100 hover:fill-primary-500 transition-all ease-in-out duration-150"
              />
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex flex-col gap-y-2 mt-6">
        <div className="flex items-center justify-between">
          <NowPlaying />
          <ThemeSwitch />
        </div>
        <div className="flex items-center space-x-2 text-gray-900/50 dark:text-white/60">
          <div>Copyright {`© 2022 - ${new Date().getFullYear()}`}</div>
          <Link
            href="/"
            className="font-medium text-gray-900 dark:text-slate-100 hover:text-primary-500"
          >
            {siteMetadata.author}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
