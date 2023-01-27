import type { NextPage } from 'next'

export type PageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
