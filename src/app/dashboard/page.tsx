import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { GITHUB_ACCOUNTS, ROUTES } from '@/data/app'
import { seo } from '@/data/meta'
import cn from '@/lib/cn'

import CodingActivity from './_components/coding-activity'
import Contributions from './_components/contributions'
import ProfileStats from './_components/profile-stats'
import SiteStats from './_components/site-stats'

export const metadata: Metadata = seo({
  title: 'Dashboard',
  description:
    'Discover a comprehensive overview of digital presence, encompassing coding insights, key metrics, and more, all conveniently in one place.',
  keywords: ['statistics', 'stats', 'dashboard', 'github'],
  url: ROUTES.dashboard,
})

const DashboardPage = async () => {
  return (
    <>
      <PageHeader title="Dashboard" description="Metrics and coding insights" />
      <div id="content">
        <Container className={cn('gap-y-8')}>
          <ProfileStats />
          <SiteStats />
          <CodingActivity />
          {GITHUB_ACCOUNTS?.filter((account) => account?.isActive).map(
            (account) => (
              <Contributions
                key={account.type}
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
