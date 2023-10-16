'use client'

import { Medal } from '@/components/icons'
import { useRequest } from '@/hooks'
import cn from '@/lib/cn'

import OverviewCard from './overview-card'
import Section from './section'

const ProfileStats = () => {
  const { data, loading } = useRequest<{
    followers: number
    stars: number
    endorsements: number
  }>('/api/stats/profile')

  return (
    <Section
      title="Profile Stats"
      icon={<Medal />}
      loading={loading}
      subHeading={<p>Showcasing GitHub stars, followers, and endorsements.</p>}
    >
      <div className={cn('mb-1 grid gap-3 py-2 md:grid-cols-3')}>
        <OverviewCard label="Stars on GitHub" value={data?.stars ?? 0} />
        <OverviewCard label="GitHub Followers" value={data?.followers ?? 0} />
        <OverviewCard
          label="Total Endorsements"
          value={data?.endorsements ?? 0}
        />
      </div>
    </Section>
  )
}

export default ProfileStats
