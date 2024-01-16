import Link from 'next/link'

import { FOOTER_ICON_LINKS, FOOTER_LINKS } from '@/config/links'
import site from '@/config/site'
import cn from '@/utils/cn'

import { Container } from './ui'

const Footer = () => (
  <footer className={cn('bg-pattern mb-10 mt-24 pt-16 text-sm')}>
    <Container>
      <nav className={cn('mb-8 grid grid-cols-2 gap-y-2', 'sm:grid-cols-3')}>
        {FOOTER_LINKS.map((groups, index) => (
          <div
            key={`group-${index}`}
            className={cn('flex flex-col items-start gap-2')}
          >
            {groups.map(({ title, url }) => (
              <Link
                key={title}
                href={url}
                className={cn(
                  'font-medium text-muted-foreground transition-colors duration-200',
                  'hover:text-foreground',
                )}
              >
                {title}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className={cn('flex items-center justify-between gap-4')}>
        <div className={cn('font-medium')}>
          &copy; {new Date().getFullYear()}{' '}
          <Link href="/">{site.author.name}</Link> ——{' '}
          <em className={cn('text-muted-foreground')}>Jakarta, Indonesia</em>
        </div>
        <div className={cn('flex gap-4')}>
          {FOOTER_ICON_LINKS.map(({ title, url, icon, className }) => (
            <Link
              key={title}
              href={url}
              title={title}
              className={cn(
                'text-muted-foreground transition-colors duration-200 ease-out',
                className,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer
