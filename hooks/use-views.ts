import { useEffect } from 'react';

import type { APIErrorResponse, APISingleResponse } from '@/types/server';

import useRequest from './use-request';

const useViews = ({
  slug,
  trackView,
}: {
  slug: string;
  trackView?: boolean;
}) => {
  const { data, isLoading } = useRequest<
    APISingleResponse<{ total: number }>,
    APIErrorResponse
  >(`/api/views/${slug}`);

  const views = data?.data?.total ?? 0;

  const registerView = async (id: string) => {
    await fetch(`/api/views/${id}`, { method: 'POST' });
  };

  useEffect(() => {
    if (trackView) {
      registerView(slug);
    }
  }, [slug, trackView]);

  return { views, isLoading };
};

export default useViews;
