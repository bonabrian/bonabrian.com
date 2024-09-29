import type { APIErrorResponse, APIListResponse } from '@/types/server';
import type { Device } from '@/types/spotify';

import useRequest from './use-request';

const useDevices = () => {
  const { data, isLoading, error } = useRequest<
    APIListResponse<Device>,
    APIErrorResponse
  >('/api/spotify/devices');

  const devices = data?.data;

  return {
    devices,
    isLoading,
    error,
  };
};

export default useDevices;
