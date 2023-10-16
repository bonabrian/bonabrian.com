import type { WakaTime } from '@/data/app'
import { useRequest } from '@/hooks'

const useWakatime = () => {
  const { data, loading, error } = useRequest<WakaTime>('/api/wakatime')

  return { data, loading, error }
}

export default useWakatime
