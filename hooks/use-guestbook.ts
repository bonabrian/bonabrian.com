import type { Guestbook } from '@/types/guestbook';
import type { APIErrorResponse, APIListResponse } from '@/types/server';

import useRequest from './use-request';

const useGuestbook = () => {
  const { data, error, mutate, isLoading } = useRequest<
    APIListResponse<Guestbook>,
    APIErrorResponse
  >('/api/guestbook');

  const entries = data?.data ?? [];

  const addEntry = async (message: string) => {
    try {
      const response = await fetch('api/guestbook', {
        method: 'POST',
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const json = await response.json();
        const message =
          json.message ?? 'There was a problem to add your message.';
        throw new Error(message);
      }
    } catch (error) {
      throw error;
    } finally {
      mutate();
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/guestbook/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const json = await response.json();
        const message =
          json.message ?? 'There was a problem to delete your message.';
        throw new Error(message);
      }
    } catch (error) {
      throw error;
    } finally {
      mutate();
    }
  };

  return {
    entries,
    isLoading,
    error,
    addEntry,
    deleteEntry,
  };
};

export default useGuestbook;
