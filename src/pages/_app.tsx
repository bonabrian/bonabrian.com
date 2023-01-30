import '@/styles/app.css'

import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'

import GoogleAnalytic from '@/components/GoogleAnalytic'
import { ProgressBar } from '@/components/ProgressBar'
import { ScrollObserver } from '@/components/ScrollObserver'
import { siteMetadata } from '@/data'
import { MainLayout } from '@/layouts'
import { trackPageView } from '@/lib/gtag'
import type { PageWithLayout } from '@/types/layout'

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>)

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
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <SessionProvider session={session}>
          <AnimatePresence mode="wait" initial={false}>
            <ScrollObserver>
              <ProgressBar />
              {getLayout(<Component {...rest} />)}
            </ScrollObserver>
          </AnimatePresence>
        </SessionProvider>
      </ThemeProvider>
      <GoogleAnalytic />
    </>
  )
}

export default MyApp
