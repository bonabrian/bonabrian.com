import { useRequest } from './use-request'

export const useInsights = () => {
  const { data, loading, error } = useRequest<
    | {
        github: { followers: number; stars: number }
        endorsements: number
        views: number
        reactions: number
      }
    | undefined
  >('/api/insights')

  return { data, loading, error }
}
