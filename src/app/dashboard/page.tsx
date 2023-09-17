import type { Metadata } from 'next'

import { Container } from '@/components/common'
import Contributions from '@/components/contributions'
import PageHeader from '@/components/page-header'
import {
  GithubStats,
  TotalEndorsements,
  TotalReactions,
  TotalViews,
} from '@/components/statistics'
import { GITHUB_ACCOUNTS } from '@/constants/github'
import cn from '@/lib/cn'
import { getMetadata } from '@/lib/metadata'

export const metadata: Metadata = getMetadata({
  title: 'Dashboard',
  description: 'Statistics about my digital home, Github, and more',
  keywords: ['statistics', 'stats', 'dashboard', 'github'],
})

const DashboardPage = () => {
  return (
    <>
      <PageHeader title="Stats" />
      <div id="content">
        <Container>
          <div
            className={cn(
              'grid grid-cols-1 grid-flow-row auto-rows-auto gap-4',
              'sm:grid-cols-2',
              'lg:grid-cols-3',
            )}
          >
            <TotalViews />
            <TotalReactions />
            <TotalEndorsements />
            <GithubStats />
          </div>
          <div className={cn('mt-10')}>
            {GITHUB_ACCOUNTS?.filter((account) => account?.isActive).map(
              (account, index) => (
                <Contributions
                  key={index}
                  username={account?.username}
                  endpoint={account?.endpoint}
                />
              ),
            )}
          </div>
        </Container>
      </div>
    </>
  )
}

export default DashboardPage
