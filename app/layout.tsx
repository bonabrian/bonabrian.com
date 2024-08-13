import './global.css';

import { DM_Sans as DMSans } from 'next/font/google';

import Providers from '@/components/providers';
import { Header } from '@/components/shared';
import { cn } from '@/lib/utils';

const font = DMSans({ subsets: ['latin'] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={font.className}>
      <Providers>
        <div id="__app" className={cn('flex min-h-screen flex-col')}>
          <Header />
          {children}
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
