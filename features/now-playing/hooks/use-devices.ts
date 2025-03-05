import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APIListResponse } from '@/types/server';

import type { Device } from '../types';

export const useDevices = () => {
  const { data, isLoading, error } = useRequest<
    APIListResponse<Device>,
    APIErrorResponse
  >('/api/spotify/devices');

  const devices = data?.data ?? [];

  return { devices, isLoading, error };
};
