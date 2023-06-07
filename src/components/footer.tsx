import cx from 'classnames'
import { RiGithubLine, RiLinkedinLine, RiRssLine } from 'react-icons/ri'

import { routes } from '@/lib/constants'
import { defaultMetadata } from '@/lib/metadata'

import Container from './container'
import Link from './link'
import NowPlaying from './now-playing'

const footerLinks = [
  [
    {
      title: 'Projects',
      url: routes.PROJECTS,
    },
    {
      title: 'About',
      url: routes.ABOUT,
    },
  ],
  [
    {
      title: 'Blog',
      url: routes.BLOG,
    },
    {
      title: 'Snippets',
      url: routes.SNIPPETS,
    },
  ],
  [
    {
      title: 'Endorsements',
      url: routes.ENDORSEMENTS,
    },
    {
      title: 'Stats',
      url: routes.STATS,
    },
  ],
]

const iconLinks = [
  {
    title: 'Github',
    url: defaultMetadata.author.github,
    icon: RiGithubLine,
  },
  {
    title: 'LinkedIn',
    url: defaultMetadata.author.linkedin,
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
    <footer className={cx('bg-pattern border-primary-500 mt-24 pt-16 text-sm')}>
      <Container>
        <nav
          className={cx(
            'flex flex-col justify-between gap-6 mb-4 text-gray-900',
            'sm:flex-row sm:items-center sm:gap-4',
            'dark:text-slate-100',
          )}
        >
          {footerLinks.map((groups, index) => (
            <div
              key={`group-${index}`}
              className={cx('flex flex-col space-y-4', 'md:items-start')}
            >
              {groups.map(({ title, url }) => (
                <Link key={title} href={url} className={cx('nav-link mx-0')}>
                  {title}
                </Link>
              ))}
            </div>
          ))}
          <div className={cx('flex flex-row gap-4')}>
            {iconLinks.map(({ title, url, icon: Icon }) => (
              <Link
                key={title}
                href={url}
                showExternalLinkIcon={false}
                title={title}
              >
                <Icon
                  size={24}
                  className={cx(
                    'hover:fill-primary-500 transition-all ease-in-out duration-150',
                  )}
                />
              </Link>
            ))}
          </div>
        </nav>
        <div className={cx('mt-4')}>
          <NowPlaying />
          <div className={cx('flex items-center py-8 space-x-2')}>
            <div>Copyright {`© 2022 - ${new Date().getFullYear()}`}</div>
            <Link
              href="/"
              className={cx('font-semibold hover:text-primary-500')}
            >
              {defaultMetadata.author.name}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
