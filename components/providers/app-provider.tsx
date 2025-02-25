'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import useMounted from '@/hooks/use-mounted';

import RenderIf from '../shared/render-if';
import { TooltipProvider } from '../ui/tooltip';
import CommandPaletteProvider from './command-palette-provider';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();

  return (
    <RenderIf isTrue={mounted}>
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
    </RenderIf>
  );
};

export default AppProvider;
