import type { APIErrorResponse, APISingleResponse } from '@/types/server';
import type { NowPlaying } from '@/types/spotify';

import useRequest from './use-request';

const useNowPlaying = () => {
  const { data, isLoading, error } = useRequest<
    APISingleResponse<NowPlaying>,
    APIErrorResponse
  >('/api/spotify/now-playing');

  const track = data?.data;

  return {
    track,
    isLoading,
    error,
  };
};

export default useNowPlaying;
