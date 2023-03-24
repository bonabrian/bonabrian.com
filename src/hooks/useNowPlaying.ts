import type { NowPlaying } from '@/lib/spotify'

import { useRequest } from './useRequest'

export const useNowPlaying = () => {
  const { data, loading, error } = useRequest<NowPlaying>('/api/now-playing')

  return { data, loading, error }
}
