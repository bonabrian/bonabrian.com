'use client';

import { usePathname } from 'next/navigation';

import { NAV_LINKS } from '@/constants';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MenuKebab } from './icons';
import Link from './link';

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn('flex', 'md:hidden')}>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <MenuKebab />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('w-56')}>
        {NAV_LINKS.map(({ path, label, icon }) => (
          <DropdownMenuItem
            key={path}
            className={cn(
              'text-muted-foreground rounded px-2 py-1.5 text-sm font-semibold transition-colors duration-150',
              'hover:bg-accent hover:text-accent-foreground',
              '[&:not(:last-child)]:mb-0.5',
              {
                'bg-accent text-accent-foreground': pathname === path,
              },
            )}
          >
            <Link href={path} className={cn('flex items-center gap-2')}>
              {icon}
              <span>{label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
