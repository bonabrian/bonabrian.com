import { useRequest } from '@/hooks'

import type { SkillCategory } from '../_types/skill'

interface Props {
  fallbackData: Array<SkillCategory>
}

const useEndorsements = ({ fallbackData }: Props) => {
  const {
    data: endorsements,
    loading,
    error,
    mutate,
  } = useRequest<Array<SkillCategory>>('/api/endorsements', {
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
