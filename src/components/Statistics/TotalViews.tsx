import { RiEyeLine } from 'react-icons/ri'

import { useRequest } from '@/hooks'

import { StatisticsCard } from './StatisticsCard'

export const TotalViews = () => {
  const { data, loading } = useRequest<{ total?: number }>(
    '/api/statistics/total-views',
  )
  return (
    <StatisticsCard
      link="/"
      text="All-Time Views"
      value={`${data?.total?.toLocaleString() || '-'}`}
      loading={loading}
      icon={RiEyeLine}
    />
  )
}
