import type { Device } from '@/types/spotify'

import { useRequest } from './use-request'

export const useAvailableDevices = () => {
  const { data, loading, error } = useRequest<Device[]>(
    '/api/spotify/available-devices',
  )

  return { data, loading, error }
}
