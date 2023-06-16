'use client'

import { useRequest } from '@/hooks'

import { GitHub, Star } from '../icons'
import StatisticsCard from './statistics-card'

const GithubStats = () => {
  const { data, loading } = useRequest<{ followers: number; stars: number }>(
    '/api/statistics/github',
  )

  return (
    <>
      <StatisticsCard
        link="https://github.com/bonabrian?tab=repositories"
        text="Stars on Github"
        value={data?.stars ?? 0}
        loading={loading}
        icon={<Star className="w-5 h-5" />}
      />

      <StatisticsCard
        link="https://github.com/bonabrian"
        text="Github Followers"
        value={data?.followers ?? 0}
        loading={loading}
        icon={<GitHub className="w-5 h-5" />}
      />
    </>
  )
}

export default GithubStats
