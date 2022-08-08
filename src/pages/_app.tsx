import '@/styles/nprogress.css'

import type { AppProps } from 'next/app'
import Router from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import nProgress from 'nprogress'

import Analytics from '@/common/components/Analytics'
import Layout from '@/common/components/Layout'
import { metadata } from '@/common/data'
import { GlobalStyles } from '@/styles'

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute='data-theme' defaultTheme={metadata.theme}>
        <GlobalStyles />
        <Analytics />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
