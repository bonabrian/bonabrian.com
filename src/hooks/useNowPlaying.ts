import type { TrackData } from '@/lib/spotify'

import { useRequest } from './useRequest'

export const useNowPlaying = () => {
  const { data, loading, error } = useRequest<TrackData>('/api/now-playing')

  return { data, loading, error }
}
