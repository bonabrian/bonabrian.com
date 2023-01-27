import { HiOutlineBadgeCheck } from 'react-icons/hi'

import { useRequest } from '@/hooks'

import { MetricCard } from './MetricCard'

export const EndorsementsCard = () => {
  const { data, loading } = useRequest<{ total?: number }>('/api/endorsements')

  return (
    <MetricCard
      link="/endorsements"
      text="All endorsements"
      value={`${data?.total?.toLocaleString() || '-'}`}
      icon={HiOutlineBadgeCheck}
      loading={loading}
    />
  )
}
