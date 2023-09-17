import type { NowPlaying } from '@/types/spotify'

import { useRequest } from './use-request'

export const useNowPlaying = () => {
  const { data, loading, error } = useRequest<NowPlaying>(
    '/api/spotify/now-playing',
  )

  return { data, loading, error }
}
