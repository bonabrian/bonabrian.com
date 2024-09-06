import type { Fetcher, Key, KeyedMutator, SWRConfiguration } from 'swr';
import useSWR from 'swr';

import defaultFetcher from '@/lib/fetcher';

interface UseRequestResponse<R = unknown, E = unknown> {
  data?: R;
  isLoading: boolean;
  error?: E;
  mutate: KeyedMutator<R>;
}

const useRequest = <R extends unknown, E extends unknown>(
  key: Key,
  fetcher: Fetcher<R> = defaultFetcher,
  options: SWRConfiguration<R, E> = {},
): UseRequestResponse<R, E> => {
  const { data, error, mutate } = useSWR<R, E>(key, fetcher, options);

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useRequest;
