import { RiEyeLine } from 'react-icons/ri'

import { useRequest } from '@/hooks'

import { MetricCard } from './MetricCard'

export const ViewsCard = () => {
  const { data, loading } = useRequest<{ total?: number }>('/api/views')

  return (
    <MetricCard
      link="/"
      text="All-Time views"
      value={`${data?.total?.toLocaleString() || '-'}`}
      icon={RiEyeLine}
      loading={loading}
    />
  )
}
