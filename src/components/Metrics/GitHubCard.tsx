import { AiOutlineStar } from 'react-icons/ai'
import { RiGithubLine } from 'react-icons/ri'

import { useRequest } from '@/hooks'

import { MetricCard } from './MetricCard'

export const GitHubCard = () => {
  const { data, loading } = useRequest<{ followers?: number; stars?: number }>(
    '/api/github',
  )

  return (
    <>
      <MetricCard
        link="https://github.com/bonabrian?tab=repositories"
        text="stars on GitHub"
        value={`${data?.stars?.toLocaleString() || ''}`}
        icon={AiOutlineStar}
        loading={loading}
      />
      <MetricCard
        link="https://github.com/bonabrian"
        text="followers on GitHub"
        value={`${data?.followers?.toLocaleString() || ''}`}
        icon={RiGithubLine}
        loading={loading}
      />
    </>
  )
}
