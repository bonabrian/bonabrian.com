import '@/styles/app.css'

import { Poppins } from 'next/font/google'

import Analytics from '@/components/analytics'
import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import Providers from '@/components/providers'

const fontSans = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
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
