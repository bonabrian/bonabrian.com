import type { NowPlaying } from '@/types/spotify'

import useRequest from './use-request'

const useNowPlaying = () => {
  const { data, loading, error } = useRequest<NowPlaying>(
    '/api/spotify/now-playing',
  )

  return { data, loading, error }
}

export default useNowPlaying
