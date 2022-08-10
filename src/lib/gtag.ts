import siteMetadata from '@/data/siteMetadata'

const GA_TRACKING_ID = siteMetadata.gaId
declare const window: Window &
  typeof globalThis & {
    gtag: any
  }

export const pageView = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
