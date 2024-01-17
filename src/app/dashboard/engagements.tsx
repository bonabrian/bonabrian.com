'use client'

import { BarChart } from '@/components/icons'
import cn from '@/utils/cn'

import OverviewCard from './overview-card'
import Section from './section'
import useStats from './use-stats'

const Engagements = () => {
  const { data, loading } = useStats<{
    views: number
    reactions: number
    endorsements: number
  }>('engagements')

  return (
    <Section
      title="Engagements"
      icon={<BarChart className={cn('h-5 w-5')} />}
      description="Discover the numbers behind views, reactions, and endorsements."
      loading={loading}
    >
      <div className={cn('mb-1 grid gap-3 py-2', 'md:grid-cols-3')}>
        <OverviewCard label="All-Time Views" value={data?.views ?? 0} />
        <OverviewCard label="All-Time Reactions" value={data?.reactions ?? 0} />
        <OverviewCard label="Endorsements" value={data?.endorsements ?? 0} />
      </div>
    </Section>
  )
}

export default Engagements
