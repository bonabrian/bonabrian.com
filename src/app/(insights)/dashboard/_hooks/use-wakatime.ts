import { useRequest } from '@/hooks'

import type { WakaTime } from '../_types/wakatime'

const useWakatime = () => {
  const { data, loading, error } = useRequest<WakaTime>('/api/wakatime')

  return { data, loading, error }
}

export default useWakatime
