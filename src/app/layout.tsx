import '@/styles/app.css'

import type { Metadata } from 'next'
import {
  Fira_Code as FiraCode,
  Inter,
  Plus_Jakarta_Sans as PlusJakartaSans,
} from 'next/font/google'

import Analytics from '@/components/analytics'
import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import NowPlaying from '@/components/now-playing'
import Providers from '@/components/providers'
import { DEFAULT_METADATA, seo } from '@/data/meta'
import cn from '@/lib/cn'

import GuestbookWidgetButton from './guestbook/components/guestbook-widget-button'

interface RootLayoutProps {
  children: React.ReactNode
}

const fontPlusJakarta = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'fallback',
  weight: ['400', '500', '600', '700', '800'],
})

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['900'],
})

const firaCode = FiraCode({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = seo({
  ...DEFAULT_METADATA,
})

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        firaCode.variable,
        fontInter.variable,
        fontPlusJakarta.variable,
      )}
    >
      <body>
        <Providers>
          <div id="__app">
            <Navigation />
            <main>{children}</main>
            <Footer />
            <GuestbookWidgetButton />
            <NowPlaying />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
