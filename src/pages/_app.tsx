import '@/styles/app.css'

import type { AppProps } from 'next/app'
import Router, { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import nProgress from 'nprogress'
import { useEffect } from 'react'

import GoogleAnalytic from '@/components/GoogleAnalytic'
import Layout from '@/components/Layout'
import siteMetadata from '@/data/siteMetadata'
import { trackPageView } from '@/lib/gtag'

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

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
          <Layout>
            <Component {...rest} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
      <GoogleAnalytic />
    </>
  )
}

export default MyApp
