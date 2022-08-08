import Script from 'next/script'

import { metadata } from '../data'

const GoogleAnalytic = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${metadata.analytics}`}
      />

      <Script strategy='lazyOnload' id='#ga'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${metadata.analytics}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

const Analytics = () => {
  const isProduction = process.env.NODE_ENV === 'production'

  return <>{isProduction && metadata.analytics && <GoogleAnalytic />}</>
}

export default Analytics
