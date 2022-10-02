const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
declare const window: Window &
  typeof globalThis & {
    gtag: any
  }

export const trackPageView = (url: string) => {
  if (window && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}
