import type { GithubUserContributionsCollection } from '@/data/app'
import { useRequest } from '@/hooks'

const useContributions = (endpoint: string) => {
  const { data, loading, error } = useRequest<
    GithubUserContributionsCollection | undefined
  >(endpoint)

  return { data, loading, error }
}

export default useContributions
