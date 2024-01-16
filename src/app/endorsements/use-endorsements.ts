import useRequest from '@/hooks/use-request'
import type { SkillCategory } from '@/types/skill'

interface Props {
  fallbackData: SkillCategory[]
}

const useEndorsements = ({ fallbackData }: Props) => {
  const {
    data: endorsements,
    loading,
    error,
    mutate,
  } = useRequest<SkillCategory[]>('/api/endorsements', {
    fallbackData,
  })

  return {
    endorsements,
    loading,
    error,
    mutate,
  }
}

export default useEndorsements
