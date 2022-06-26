import type { EmotionCache } from '@emotion/cache'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'

import { createEmotionCache } from '@/common/utils'
import { GlobalStyles } from '@/styles'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <GlobalStyles />
      <ThemeProvider theme={{ theme: 'dark' }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
