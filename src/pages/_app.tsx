import '@/styles/app.css'

import { Analytics } from '@vercel/analytics/react'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import Footer from '@/components/footer'
import { defaultMetadata } from '@/components/metadata'
import Navigation from '@/components/navigation'
import ProgressBar from '@/components/progress-bar'
import { ScrollObserver } from '@/components/scroll-observer'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { session, ...rest } = pageProps

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme={defaultMetadata.themeColor}
      >
        <SessionProvider session={session}>
          <AnimatePresence mode="wait" initial={false}>
            <ScrollObserver>
              <ProgressBar />
              <Navigation />
              <main
                className="flex flex-col mx-auto max-w-5xl justify-center py-10 px-4"
                role="main"
              >
                <div className="min-h-screen">
                  <Component {...rest} />
                </div>
              </main>
              <Footer />
            </ScrollObserver>
          </AnimatePresence>
        </SessionProvider>
      </ThemeProvider>
      <Analytics />
    </>
  )
}

export default MyApp
