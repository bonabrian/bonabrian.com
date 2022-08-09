import Script from 'next/script'

import siteMetadata from '../data/siteMetadata'

const GoogleAnalytic = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics}`}
      />

      <Script strategy='lazyOnload' id='#ga'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${siteMetadata.analytics}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

const Analytics = () => {
  const isProduction = process.env.NODE_ENV === 'production'

  return <>{isProduction && siteMetadata.analytics && <GoogleAnalytic />}</>
}

export default Analytics
