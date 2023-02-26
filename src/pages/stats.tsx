import { Metadata } from '@/components/metadata'
import PageHeader from '@/components/page-header'
import {
  GithubStats,
  TotalEndorsements,
  TotalViews,
} from '@/components/statistics'

const Stats = () => {
  return (
    <>
      <Metadata
        title="Stats"
        description="Statistics about my digital home, Github, and more"
        keywords={['statistics', 'stats', 'dashboard', 'github']}
      />
      <div className="my-4 space-y-3 md:space-y-5">
        <PageHeader title="Stats" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 grid-flow-row auto-rows-auto gap-4">
        <TotalViews />
        <TotalEndorsements />
        <GithubStats />
      </div>
    </>
  )
}

export default Stats
