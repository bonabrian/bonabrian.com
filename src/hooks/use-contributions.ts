import type { GithubUserContributionsCollection } from '@/types/github'

import { useRequest } from './use-request'

export const useContributions = (endpoint: string) => {
  const { data, loading, error } = useRequest<
    GithubUserContributionsCollection | undefined
  >(endpoint)

  return { data, loading, error }
}
