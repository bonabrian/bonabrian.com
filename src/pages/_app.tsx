import '@/styles/app.css'

import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'

import Footer from '@/components/footer'
import GoogleAnalytics from '@/components/google-analytics'
import { defaultMetadata } from '@/components/metadata'
import Navigation from '@/components/navigation'
import ProgressBar from '@/components/progress-bar'
import { ScrollObserver } from '@/components/scroll-observer'
import { trackPageView } from '@/lib/gtag'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
      <GoogleAnalytics />
    </>
  )
}

export default MyApp
