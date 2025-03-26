import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APIListResponse } from '@/types/api';

import type { SkillCategory } from '../types';

export const useEndorsements = () => {
  const { data, isLoading, error, mutate } = useRequest<
    APIListResponse<SkillCategory>,
    APIErrorResponse
  >('/api/endorsements');

  const endorsements = data?.data ?? [];

  const addEndorsement = async (skillId: string) => {
    try {
      const response = await fetch('/api/endorsements', {
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

  return { endorsements, isLoading, error, mutate, addEndorsement };
};
