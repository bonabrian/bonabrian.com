import '@/styles/app.css'

import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'

import GoogleAnalytic from '@/components/GoogleAnalytic'
import Layout from '@/components/Layout'
import ProgressBar from '@/components/ProgressBar'
import { ScrollObserver } from '@/components/ScrollObserver'
import siteMetadata from '@/data/siteMetadata'
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
      <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
        <SessionProvider session={session}>
          <AnimatePresence exitBeforeEnter initial={false}>
            <ScrollObserver>
              <ProgressBar />
              <Layout>
                <Component {...rest} />
              </Layout>
            </ScrollObserver>
          </AnimatePresence>
        </SessionProvider>
      </ThemeProvider>
      <GoogleAnalytic />
    </>
  )
}

export default MyApp
