'use client'

import { useRequest } from '@/hooks'

import { Check } from '../icons'
import StatisticsCard from './statistics-card'

const TotalEndorsements = () => {
  const { data, loading } = useRequest<{ total: number }>(
    '/api/statistics/endorsements',
  )

  return (
    <StatisticsCard
      link="/endorsements"
      text="Total Endorsements"
      value={data?.total ?? 0}
      loading={loading}
      icon={<Check className="w-5 h-5" />}
    />
  )
}

export default TotalEndorsements
