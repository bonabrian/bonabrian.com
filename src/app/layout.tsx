import '@/styles/app.css'

import { Fira_Code as FiraCode, Poppins } from 'next/font/google'

import Analytics from '@/components/analytics'
import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import Providers from '@/components/providers'
import cn from '@/lib/cn'

interface RootLayoutProps {
  children: React.ReactNode
}

const fontSans = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const firaCode = FiraCode({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, firaCode.variable)}
    >
      <body>
        <Providers>
          <div id="__app">
            <Navigation />
            <main>{children}</main>
            <Footer />
            <Analytics />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
