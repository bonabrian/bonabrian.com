import type { SkillCategory } from '@/types'

import { useRequest } from './useRequest'

interface Props {
  fallbackData: Array<SkillCategory>
}

export const useSkillCategories = ({ fallbackData }: Props) => {
  const {
    data: categories,
    loading,
    error,
  } = useRequest<Array<SkillCategory>>('/api/skills', {
    fallbackData,
  })

  return {
    categories,
    loading,
    error,
  }
}
