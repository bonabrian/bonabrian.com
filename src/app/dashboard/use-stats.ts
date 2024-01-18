import useRequest from '@/hooks/use-request'

const useStats = <T>(stats: 'engagements' | 'wakatime' | 'github') => {
  const { data, loading } = useRequest<T>(`/api/dashboard/${stats}`)

  return { data, loading }
}

export default useStats
