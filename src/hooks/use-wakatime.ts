import type { WakaTime } from '@/types/wakatime'

import { useRequest } from './use-request'

export const useWakatime = () => {
  const { data, loading, error } = useRequest<WakaTime>('/api/wakatime')

  return { data, loading, error }
}
