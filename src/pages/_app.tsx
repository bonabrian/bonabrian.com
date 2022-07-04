import '@/styles/nprogress.css'

import type { AppProps } from 'next/app'
import Router from 'next/router'
import { ThemeProvider } from 'next-themes'
import nProgress from 'nprogress'

import Layout from '@/common/components/layout'
import { GlobalStyles } from '@/styles'

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='data-theme' defaultTheme='dark'>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
