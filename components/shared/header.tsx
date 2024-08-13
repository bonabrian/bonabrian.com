'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_LINKS } from '@/constants';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

import Logo from '../../assets/images/logo.svg';
import { Separator } from '../ui';
import CommandPalette from './command-palette';
import Container from './container';
import MobileMenu from './mobile-menu';
import ThemeSwitch from './theme-switch';

const Header = () => {
  const isScrolled = useScroll();
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-16 bg-background transition-colors duration-200',
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
              <Logo className={cn('h-8')} />
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
                          'flex items-center rounded px-2.5 py-1.5 text-sm font-medium transition-colors duration-200 hover:text-foreground',
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
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
