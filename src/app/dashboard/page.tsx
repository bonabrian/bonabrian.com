import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'

import CodingActivity from './coding-activity'
import Engagements from './engagements'
import GitHubInsights from './github-insights'

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
