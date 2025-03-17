'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import { NAV_LINKS } from '@/constants';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

import Container from '../container';
import { Separator } from '../ui/separator';
import CommandPalette from './command-palette';
import Link from './link';
import MobileMenu from './mobile-menu';
import ThemeSwitch from './theme-switch';

const LogoDark = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="140 127.111 220 245.778"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 235.7 131.239 Q 250 122.983 264.3 131.239 L 345.7 178.235 Q 360 186.492 360 203.004 L 360 296.996 Q 360 313.508 345.7 321.765 L 264.3 368.761 Q 250 377.017 235.7 368.761 L 154.3 321.765 Q 140 313.509 140 296.996 L 140 203.004 Q 140 186.491 154.3 178.235 Z"
        style={{ fill: 'rgb(255, 255, 255)' }}
      />
      <rect
        x="185.618"
        y="220.956"
        width="27.82"
        height="58.291"
        rx="12"
        ry="12"
      />
      <rect
        y="206.223"
        width="27.82"
        height="87.554"
        rx="12"
        ry="12"
        x="236.293"
      />
      <rect
        x="286.508"
        y="219.914"
        width="27.82"
        height="58.291"
        rx="12"
        ry="12"
      />
    </svg>
  );
};

const LogoLight = ({ className }: { className?: string }) => (
  <svg
    viewBox="140 127.111 220 245.778"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M 235.7 131.239 Q 250 122.983 264.3 131.239 L 345.7 178.235 Q 360 186.492 360 203.004 L 360 296.996 Q 360 313.508 345.7 321.765 L 264.3 368.761 Q 250 377.017 235.7 368.761 L 154.3 321.765 Q 140 313.509 140 296.996 L 140 203.004 Q 140 186.491 154.3 178.235 Z" />
    <rect
      style={{ fill: 'rgb(255, 255, 255)' }}
      x="185.618"
      y="220.956"
      width="27.82"
      height="58.291"
      rx="12"
      ry="12"
    />
    <rect
      style={{ fill: 'rgb(255, 255, 255)' }}
      y="206.223"
      width="27.82"
      height="87.554"
      rx="12"
      ry="12"
      x="236.293"
    />
    <rect
      style={{ fill: 'rgb(255, 255, 255)' }}
      x="286.508"
      y="219.914"
      width="27.82"
      height="58.291"
      rx="12"
      ry="12"
    />
  </svg>
);

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
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
