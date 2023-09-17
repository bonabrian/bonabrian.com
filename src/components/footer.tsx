import { footerIconLinks, footerLinks } from '@/constants/links'
import cn from '@/lib/cn'
import { defaultMetadata } from '@/lib/metadata'

import { Container } from './common'
import Link from './link'

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
            {footerIconLinks.map(({ title, url, icon, colorClass }) => (
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
