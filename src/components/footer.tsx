import cn from '@/lib/cn'
import { routes } from '@/lib/constants'
import { defaultMetadata } from '@/lib/metadata'

import Container from './container'
import { GitHub, LinkedIn, RSS } from './icons'
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
    icon: GitHub,
  },
  {
    title: 'LinkedIn',
    url: defaultMetadata.author.linkedin,
    icon: LinkedIn,
  },
  {
    title: 'RSS Feed',
    url: '/feed.xml',
    icon: RSS,
  },
]

const Footer = () => {
  return (
    <footer className={cn('bg-pattern mt-24 pt-16 text-sm')}>
      <Container>
        <nav
          className={cn(
            'flex flex-col justify-between gap-6 mb-4 text-gray-900',
            'sm:flex-row sm:items-center sm:gap-4',
            'dark:text-slate-100',
          )}
        >
          {footerLinks.map((groups, index) => (
            <div
              key={`group-${index}`}
              className={cn('flex flex-col space-y-4', 'md:items-start')}
            >
              {groups.map(({ title, url }) => (
                <Link key={title} href={url} className={cn('nav-link mx-0')}>
                  {title}
                </Link>
              ))}
            </div>
          ))}
          <div className={cn('flex flex-row gap-4')}>
            {iconLinks.map(({ title, url, icon: Icon }) => (
              <Link
                key={title}
                href={url}
                showExternalLinkIcon={false}
                title={title}
                className={cn('transition-all ease-in-out duration-150')}
              >
                <Icon className={cn('w-5 h-5')} />
              </Link>
            ))}
          </div>
        </nav>
        <div className={cn('mt-4')}>
          <NowPlaying />
          <div className={cn('flex items-center py-8 space-x-2')}>
            <div>Copyright {`© 2022 - ${new Date().getFullYear()}`}</div>
            <Link href="/" className={cn('font-semibold')}>
              {defaultMetadata.author.name}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
