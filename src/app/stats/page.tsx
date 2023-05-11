import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import {
  GithubStats,
  ReactionStats,
  TotalEndorsements,
  TotalViews,
} from '@/components/statistics'
import { getMetadata } from '@/lib/metadata'

export const metadata: Metadata = getMetadata({
  title: 'Stats',
  description: 'Statistics about my digital home, Github, and more',
  keywords: ['statistics', 'stats', 'dashboard', 'github'],
})

const StatsPage = () => {
  return (
    <>
      <div className="my-4 space-y-3 md:space-y-5">
        <PageHeader title="Stats" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row auto-rows-auto gap-4">
        <TotalViews />
        <TotalEndorsements />
        <GithubStats />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 grid-flow-row auto-rows-auto gap-4 mt-4">
        <ReactionStats />
      </div>
    </>
  )
}

export default StatsPage
