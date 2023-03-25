import { HiOutlineBadgeCheck } from 'react-icons/hi'

import { useRequest } from '@/hooks'

import { StatisticsCard } from './statistics-card'

export const TotalEndorsements = () => {
  const { data, loading } = useRequest<{ total?: number }>(
    '/api/statistics/endorsements',
  )
  return (
    <StatisticsCard
      link="/endorsements"
      text="Total Endorsements"
      value={`${data?.total?.toLocaleString() || '-'}`}
      loading={loading}
      icon={HiOutlineBadgeCheck}
    />
  )
}
