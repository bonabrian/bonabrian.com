import type { APIErrorResponse, APIListResponse } from '@/types/server';
import type { SkillCategory } from '@/types/skill';

import useRequest from './use-request';

const useEndorsements = ({
  fallbackData,
}: {
  fallbackData: SkillCategory[];
}) => {
  const { data, isLoading, error, mutate } = useRequest<
    APIListResponse<SkillCategory>,
    APIErrorResponse
  >('/api/endorsements', undefined, {
    fallbackData: {
      data: fallbackData,
    },
  });

  const endorsements = data?.data ?? fallbackData;

  const addEndorsement = async (skillId: string) => {
    try {
      const response = await fetch('api/endorsements', {
        method: 'POST',
        body: JSON.stringify({ skillId }),
      });

      if (!response.ok) {
        const json = await response.json();
        const message =
          json.message ?? 'There was a problem endorsing this skill.';
        throw new Error(message);
      }
    } catch (error) {
      throw error;
    } finally {
      mutate();
    }
  };

  return {
    endorsements,
    isLoading,
    error,
    mutate,
    addEndorsement,
  };
};

export default useEndorsements;
