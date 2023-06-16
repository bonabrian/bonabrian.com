'use client'

import { useRequest } from '@/hooks'

import { Eye } from '../icons'
import StatisticsCard from './statistics-card'

const TotalViews = () => {
  const { data, loading } = useRequest<{ total: number }>(
    '/api/statistics/views',
  )

  return (
    <StatisticsCard
      text="All-Time Views"
      value={data?.total ?? 0}
      loading={loading}
      icon={<Eye className="w-5 h-5" />}
    />
  )
}

export default TotalViews
