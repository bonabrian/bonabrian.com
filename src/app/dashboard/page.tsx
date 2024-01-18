import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { seo } from '@/lib/meta'

import CodingActivity from './coding-activity'
import Engagements from './engagements'
import GitHubInsights from './github-insights'

export const metadata: Metadata = seo({
  title: 'Dashboard',
  description:
    'Discover a comprehensive overview of digital presence, encompassing coding insights, key metrics, and more, all conveniently in one place.',
  keywords: ['statistics', 'stats', 'dashboard', 'github'],
  url: ROUTES.dashboard,
})

const DashboardPage = () => {
  return (
    <>
      <PageHeader title="Dashboard" description="Metrics and coding insights" />
      <Container>
        <div className="flex flex-col gap-8">
          <Engagements />
          <CodingActivity />
          <GitHubInsights />
        </div>
      </Container>
    </>
  )
}

export default DashboardPage
