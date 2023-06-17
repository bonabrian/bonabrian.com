'use client'

import { useRequest } from '@/hooks'

import { BarChart } from '../icons'
import StatisticsCard from './statistics-card'

const TotalReactions = () => {
  const { data, loading } = useRequest<{ total: number }>(
    '/api/statistics/reactions',
  )

  return (
    <StatisticsCard
      text="All-Time Reactions"
      value={data?.total ?? 0}
      loading={loading}
      icon={<BarChart className="w-5 h-5" />}
    />
  )
}

export default TotalReactions
