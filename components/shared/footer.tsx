import { FOOTER_ICON_LINKS, FOOTER_LINKS } from '@/constants/links';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

import Container from '../container';
import Link from '../link';

const Footer = () => {
  return (
    <footer className={cn('bg-grid mt-24 mb-10 pt-16 text-sm')}>
      <Container>
        <nav className={cn('mb-8 grid grid-cols-2 gap-y-2', 'sm:grid-cols-3')}>
          {FOOTER_LINKS.map((groups, index) => (
            <div
              key={`footerGroup${index}`}
              className={cn('flex flex-col items-start gap-2')}
            >
              {groups.map(({ title, path }) => (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    'text-muted-foreground font-medium transition-colors duration-200',
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
            <Link href="/">{SITE.author.name}</Link> ——{' '}
            <em className={cn('text-muted-foreground')}>Jakarta, Indonesia</em>
          </div>
          <div className={cn('flex gap-4')}>
            {FOOTER_ICON_LINKS.map(({ title, url, icon, className }, index) => (
              <Link
                key={`footerIcon-${title}-${index}`}
                href={url}
                title={title}
                className={cn(
                  'text-muted-foreground transition-colors duration-200 ease-out',
                  className,
                )}
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
