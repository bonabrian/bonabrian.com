import type { Metadata } from 'next'

import CodingActivity from '@/components/coding-activity'
import { Container } from '@/components/common'
import Contributions from '@/components/contributions'
import Insights from '@/components/insights'
import PageHeader from '@/components/page-header'
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
      <PageHeader title="Dashboard" description="Metrics and Coding Insights" />
      <div id="content">
        <Container className={cn('gap-y-8')}>
          <Insights />
          <CodingActivity />
          {GITHUB_ACCOUNTS?.filter((account) => account?.isActive).map(
            (account, index) => (
              <Contributions
                key={index}
                username={account?.username}
                endpoint={account?.endpoint}
              />
            ),
          )}
        </Container>
      </div>
    </>
  )
}

export default DashboardPage
