'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import useMounted from '@/hooks/use-mounted';

import RenderIf from './shared/render-if';
import { TooltipProvider } from './ui/tooltip';

interface CommandPaletteContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CommandPaletteContext = createContext<CommandPaletteContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RenderIf isTrue={mounted}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          <CommandPaletteContext.Provider value={{ isOpen, setIsOpen }}>
            <TooltipProvider>{children}</TooltipProvider>
          </CommandPaletteContext.Provider>
        </SessionProvider>
      </ThemeProvider>
    </RenderIf>
  );
};

export default Providers;
