import createEmotionServer from '@emotion/server/create-instance'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'

import { createEmotionCache } from '@/common/utils'

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    // const originalRenderPage = ctx.renderPage
    // ctx.renderPage = () =>
    //   originalRenderPage({
    //     enhanceApp: (App) => (props: any) =>
    //       <App emotionCache={cache} {...props} />,
    //   })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <React.Fragment key={style.key}>
        <style
          data-emotion-css={`${style.key} ${style.ids.join(' ')}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      </React.Fragment>
    ))

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags,
      ],
    }
  }

  render(): JSX.Element {
    function setInitialThemeMode() {
      const getInitialThemeMode = () => {
        const persistedThemePreference = window.localStorage.getItem('theme')
        const hasPersistedPreference =
          typeof persistedThemePreference === 'string'

        if (hasPersistedPreference) return persistedThemePreference

        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        const hasMediaQueryPreference = typeof mql.matches === 'boolean'

        if (hasMediaQueryPreference) return mql.matches ? 'dark' : 'light'

        // set default to dark
        return 'dark'
      }

      document.body.dataset.theme = getInitialThemeMode()
    }

    const blockSetInitialThemeMode = `(() => {
      ${setInitialThemeMode.toString()}
      setInitialThemeMode();
    })()

    // IIFE!
    `

    return (
      <Html>
        <Head>
          <meta name='title' content='bonabrian | portfolio' />
          <meta name='description' content="bonabrian's portfolio" />
          <meta
            name='keywords'
            content='NextJS portfolio, typescript portfolio, developer portfolio, react portfolio'
          />
          <meta name='robots' content='index, follow' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />

          <meta name='author' content='Bona Brian Siagian' />
          <meta httpEquiv='content-language' content='en' />

          {/* Open Graph / Facebook */}
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://bonabrian.github.io' />
          <meta property='og:title' content='bonabrian | portfolio' />
          <meta property='og:description' content="bonabrian's portfolio" />
          {/* TODO: add og:image */}
          {/* <meta property='og:image' content='' /> */}

          {/* Twitter */}
          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:url' content='https://bonabrian.github.io' />
          <meta property='twitter:site' content='bonabrian_' />
          <meta property='twitter:title' content='bonabrian | portfolio' />
          <meta
            property='twitter:description'
            content="bonabrian's portfolio"
          />

          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#444444' />

          {/* TODO: add app-icon */}
          <link rel='icon' href='/favicon.ico' />
          {/* <link rel='manifest' href='manifest.json' /> */}
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Recursive:wght@400;600;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: blockSetInitialThemeMode }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
