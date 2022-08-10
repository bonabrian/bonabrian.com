import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const GoogleAnalytic = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.gaId}`}
      />

      <Script strategy='lazyOnload' id='#ga'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${siteMetadata.gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytic
