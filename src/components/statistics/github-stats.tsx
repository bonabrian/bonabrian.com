'use client'

import { AiOutlineStar } from 'react-icons/ai'
import { RiGithubLine } from 'react-icons/ri'

import { useRequest } from '@/hooks'

import { StatisticsCard } from './statistics-card'

export const GithubStats = () => {
  const { data, loading } = useRequest<{ followers?: number; stars?: number }>(
    '/api/statistics/github',
  )

  return (
    <>
      <StatisticsCard
        link="https://github.com/bonabrian?tab=repositories"
        text="Stars on Github"
        value={`${data?.stars?.toLocaleString() || '-'}`}
        loading={loading}
        icon={AiOutlineStar}
      />
      <StatisticsCard
        link="https://github.com/bonabrian"
        text="Github Followers"
        value={`${data?.followers?.toLocaleString() || '-'}`}
        loading={loading}
        icon={RiGithubLine}
      />
    </>
  )
}
