'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Fragment, useEffect, useState } from 'react';

import { COMMAND_PAGES, COMMAND_SOCIAL_MEDIA } from '@/constants';
import { cn } from '@/lib/utils';
import type { CommandMenu } from '@/types/menu';

import { useCommandPaletteContext } from '../providers/command-palette-provider';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { Command as CommandIcon, Moon, Sun } from './icons';

const CommandPalette = () => {
  const { isOpen, setIsOpen } = useCommandPaletteContext();
  const pathname = usePathname();
  const router = useRouter();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const { resolvedTheme: theme, setTheme } = useTheme();

  const placeholders = [
    'Type a command or search',
    'Press Cmd + K anytime to access this command pallete',
  ];

  const placeholder = placeholders[placeholderIndex];

  const isActiveRoute = (path: string) => pathname === path;

  const handleOnSelect = (action: CommandMenu) => {
    if (action.closeOnSelect) setIsOpen(false);

    if (action.onClick) {
      action.onClick();
      return;
    }

    if (action.isExternal) {
      window.open(action.href, '_blank');
    } else {
      router.push(action.href);
    }
  };

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((value) => !value);
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [setIsOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlaceholderIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [placeholderIndex]);

  const groups: Array<{ title: string; options: CommandMenu[] }> = [
    {
      title: 'Pages',
      options: COMMAND_PAGES,
    },
    {
      title: 'Social',
      options: COMMAND_SOCIAL_MEDIA,
    },
    {
      title: 'Appearance',
      options: [
        {
          label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
          href: '#',
          icon: theme === 'dark' ? <Moon /> : <Sun />,
          isExternal: false,
          eventName: `Appearance: Switch ${theme === 'dark' ? 'Light' : 'Dark'}`,
          type: 'APPEARANCE',
          onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        },
      ],
    },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open command menu"
      >
        <span className="sr-only">Open command menu</span>
        <CommandIcon />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map(({ title, options }, index) => (
            <Fragment key={title}>
              <CommandGroup heading={title}>
                {options.map((option) => (
                  <CommandItem
                    key={option.label}
                    className={cn(
                      'group flex cursor-pointer items-center justify-between [&:not(:last-child)]:mb-0.5',
                      {
                        'bg-accent':
                          option.type === 'PAGE' && isActiveRoute(option.href),
                      },
                    )}
                    onSelect={() => handleOnSelect(option)}
                  >
                    <div className={cn('flex items-center gap-2')}>
                      <div
                        className={cn(
                          'transition-transform duration-200 group-hover:-rotate-12',
                        )}
                      >
                        {option.icon}
                      </div>
                      {option.label}
                    </div>
                    {option.type === 'PAGE' && isActiveRoute(option.href) && (
                      <Badge variant="secondary">You are here</Badge>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              {index === groups.length - 1 ? null : <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
