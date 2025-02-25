import type { ShareType } from '@prisma/client';

import type { APIErrorResponse, APISingleResponse } from '@/types/server';

import useRequest from './use-request';

const useShares = (slug: string) => {
  const { data, mutate, isLoading } = useRequest<
    APISingleResponse<{ total: number }>,
    APIErrorResponse
  >(`/api/shares/${slug}`);

  const shares = data?.data?.total ?? 0;

  const addShare = (type: ShareType) => {
    // optimistic update
    mutate(
      {
        data: {
          total: shares + 1,
        },
      },
      false,
    );

    fetch(`/api/shares/${slug}`, {
      method: 'POST',
      body: JSON.stringify({ type }),
    });
  };

  return { shares, addShare, isLoading };
};

export default useShares;
