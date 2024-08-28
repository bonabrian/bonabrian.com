import defaultFetcher from '@/lib/fetcher';
import type { Fetcher, Key, KeyedMutator, SWRConfiguration } from 'swr';
import useSWR from 'swr';

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
  const { data, error, isValidating, mutate } = useSWR<R, E>(
    key,
    fetcher,
    options,
  );

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useRequest;
