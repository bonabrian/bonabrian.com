import cn from '@/lib/cn'
import { routes } from '@/lib/constants'
import { defaultMetadata } from '@/lib/metadata'

import { GitHub, LinkedIn, RSS } from './icons'
import Link from './link'
import { Container } from './ui'

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
    icon: <GitHub />,
    colorClass: 'hover:text-current',
  },
  {
    title: 'LinkedIn',
    url: defaultMetadata.author.linkedin,
    icon: <LinkedIn />,
    colorClass: 'hover:text-[#0A66C2]',
  },
  {
    title: 'RSS Feed',
    url: '/feed.xml',
    icon: <RSS />,
    colorClass: 'hover:text-[#FFA500]',
  },
]

const Footer = () => {
  return (
    <footer className={cn('bg-pattern mt-24 pt-16 text-sm mb-8')}>
      <Container>
        <nav
          className={cn(
            'flex flex-col justify-between gap-6 mb-4',
            'sm:flex-row sm:items-center sm:gap-4',
          )}
        >
          {footerLinks.map((groups, index) => (
            <div
              key={`group-${index}`}
              className={cn('flex flex-col space-y-4', 'md:items-start')}
            >
              {groups.map(({ title, url }) => (
                <Link
                  key={title}
                  href={url}
                  className={cn(
                    'text-muted-foreground mx-0 transition-colors duration-100',
                    'hover:text-foreground',
                  )}
                >
                  {title}
                </Link>
              ))}
            </div>
          ))}
          <div className={cn('flex flex-row gap-4')}>
            {iconLinks.map(({ title, url, icon, colorClass }) => (
              <Link
                key={title}
                href={url}
                showExternalLinkIcon={false}
                title={title}
                className={cn(
                  'text-muted-foreground transition-all ease-in-out duration-150',
                  colorClass,
                )}
              >
                {icon}
              </Link>
            ))}
          </div>
        </nav>
        <div className={cn('mt-4')}>
          <div className={cn('flex items-center py-8 space-x-2')}>
            <div>Copyright {`© 2022 - ${new Date().getFullYear()}`}</div>
            <Link href="/" className={cn('font-semibold text-primary')}>
              {defaultMetadata.author.name}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
