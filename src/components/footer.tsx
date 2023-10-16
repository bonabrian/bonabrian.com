import { footerIconLinks, footerLinks, siteConfig } from '@/data/app'
import cn from '@/lib/cn'

import { Container, Link } from './ui'

const Footer = () => {
  return (
    <footer className={cn('bg-pattern mb-8 mt-24 pt-16 text-sm')}>
      <Container>
        <nav
          className={cn(
            'mb-4 flex flex-col justify-between gap-6',
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
                    'mx-0 text-muted-foreground transition-colors duration-100',
                    'hover:text-foreground',
                  )}
                >
                  {title}
                </Link>
              ))}
            </div>
          ))}
          <div className={cn('flex flex-row gap-4')}>
            {footerIconLinks.map(({ title, url, icon, colorClass }) => (
              <Link
                key={title}
                href={url}
                showExternalLinkIcon={false}
                title={title}
                className={cn(
                  'text-muted-foreground transition-all duration-150 ease-in-out',
                  colorClass,
                )}
              >
                {icon}
              </Link>
            ))}
          </div>
        </nav>
        <div className={cn('mt-4')}>
          <div className={cn('flex items-center space-x-2 py-8')}>
            <div>Copyright {`© 2022 - ${new Date().getFullYear()}`}</div>
            <Link href="/" className={cn('font-semibold text-primary')}>
              {siteConfig.author.name}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
