import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APISingleResponse } from '@/types/api';

import type { NowPlaying } from '../types';

export const useNowPlaying = () => {
  const { data, isLoading, error } = useRequest<
    APISingleResponse<NowPlaying>,
    APIErrorResponse
  >('/api/spotify/now-playing');

  const track = data?.data;

  return { track, isLoading, error };
};
