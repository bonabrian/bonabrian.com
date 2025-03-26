import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APISingleResponse } from '@/types/api';

export const useStats = <T>(type: 'engagements' | 'wakatime' | 'github') => {
  const { data, isLoading } = useRequest<
    APISingleResponse<T>,
    APIErrorResponse
  >(`/api/dashboard/${type}`);

  const stats = data?.data;

  return { stats, isLoading };
};
