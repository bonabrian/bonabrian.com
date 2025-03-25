'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import { NAV_LINKS } from '@/constants';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

import LogoDark from '../../assets/images/logo-dark.svg';
import LogoLight from '../../assets/images/logo-light.svg';
import Container from '../container';
import Link from '../link';
import { Separator } from '../ui/separator';
import CommandPalette from './command-palette';
import ThemeSwitch from './theme-switch';

const Header = () => {
  const isScrolled = useScroll();
  const pathname = usePathname();
  const { resolvedTheme: theme } = useTheme();

  return (
    <header
      className={cn(
        'bg-background sticky top-0 z-50 flex h-16 transition-colors duration-200',
        isScrolled ? 'shadow-sm' : 'saturate-110',
      )}
    >
      <Container>
        <div className={cn('flex h-full flex-1 items-center justify-between')}>
          <div className={cn('flex items-center gap-4')}>
            <Link
              href="/"
              className={cn('flex items-center justify-center gap-2')}
            >
              {theme === 'dark' ? (
                <LogoDark className={cn('h-7')} />
              ) : (
                <LogoLight className={cn('h-7')} />
              )}
              <span
                className={cn(
                  'hidden font-extrabold tracking-tight',
                  'md:flex',
                )}
              >
                bonabrian
              </span>
            </Link>
            <nav className={cn('hidden', 'md:flex')}>
              <ul className={cn('flex', 'md:gap-x-0.5')}>
                {NAV_LINKS.filter(
                  ({ onlyShowOnDropdownMenu }) => !onlyShowOnDropdownMenu,
                ).map(({ path, label }) => {
                  const isActive =
                    pathname === path || pathname.startsWith(path);

                  return (
                    <li key={path} className={cn('relative')}>
                      <Link
                        href={path}
                        className={cn(
                          'hover:text-foreground flex items-center rounded px-2.5 py-1.5 text-sm font-medium transition-colors duration-200',
                          isActive
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className={cn('flex items-center gap-1')}>
            <Separator orientation="vertical" className={cn('h-6')} />
            <ThemeSwitch />
            <CommandPalette />
            {/* <MobileMenu /> */}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
