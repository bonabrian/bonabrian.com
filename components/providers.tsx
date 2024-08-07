'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import useMounted from '@/hooks/use-mounted';

import { RenderIf } from './shared';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();

  return (
    <RenderIf isTrue={mounted}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </RenderIf>
  );
};

export default Providers;
