'use client'

import { RiHeart3Line, RiStarLine, RiThumbUpLine } from 'react-icons/ri'

import { useRequest } from '@/hooks'

import StatisticsCard from './statistics-card'

const ReactionStats = () => {
  const { data, loading } = useRequest<{
    loves?: number
    likes?: number
    stars?: number
  }>('/api/statistics/reactions')

  return (
    <>
      <StatisticsCard
        text="Loves"
        value={`${data?.loves?.toLocaleString() ?? '-'}`}
        icon={RiHeart3Line}
        loading={loading}
      />
      <StatisticsCard
        text="Likes"
        value={`${data?.likes?.toLocaleString() ?? '-'}`}
        icon={RiThumbUpLine}
        loading={loading}
      />
      <StatisticsCard
        text="Stars"
        value={`${data?.stars?.toLocaleString() ?? '-'}`}
        icon={RiStarLine}
        loading={loading}
      />
    </>
  )
}

export default ReactionStats
