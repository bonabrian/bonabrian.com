'use client'

import { BarChart } from '@/components/icons'
import { useRequest } from '@/hooks'
import cn from '@/lib/cn'

import OverviewCard from './overview-card'
import Section from './section'

const SiteStats = () => {
  const { data, loading } = useRequest<{
    views: number
    reactions: number
  }>('/api/stats/site')

  return (
    <Section
      title="Site Stats"
      icon={<BarChart />}
      subHeading={
        <p>
          Statistics about this site, including all-time views and reactions.
        </p>
      }
      loading={loading}
    >
      <div className={cn('mb-1 grid md:grid-cols-2 gap-3 py-2')}>
        <OverviewCard label="All-Time Views" value={data?.views ?? 0} />
        <OverviewCard label="All-Time Reactions" value={data?.reactions ?? 0} />
      </div>
    </Section>
  )
}

export default SiteStats
