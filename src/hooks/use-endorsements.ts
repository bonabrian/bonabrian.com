import type { SkillCategory } from '@/types'

import { useRequest } from './use-request'

interface Props {
  fallbackData: Array<SkillCategory>
}

export const useEndorsements = ({ fallbackData }: Props) => {
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
