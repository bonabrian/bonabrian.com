import '@/styles/nprogress.css'

import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import nProgress from 'nprogress'

import Layout from '@/common/components/layout'
import { createEmotionCache } from '@/common/utils'
import { GlobalStyles } from '@/styles'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  )
}

export default MyApp
