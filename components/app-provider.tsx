'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import useMounted from '@/hooks/use-mounted';

import { CommandPaletteProvider } from './command-palette';
import { TooltipProvider } from './ui/tooltip';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const isMounted = useMounted();
  if (!isMounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <CommandPaletteProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </CommandPaletteProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
