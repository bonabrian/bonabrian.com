import { useRequest } from '@/hooks'

import type { GuestbookEntry } from '../_types/guestbook'

const useGuestbook = () => {
  const { data, loading, mutate } =
    useRequest<GuestbookEntry[]>(`/api/guestbook`)

  const addEntry = async (message: string) => {
    try {
      await fetch('/api/guestbook', {
        method: 'POST',
        body: JSON.stringify({ message }),
      })
    } catch (err) {
      throw err
    }
  }

  const deleteEntry = async (messageId: string) => {
    try {
      await fetch(`/api/guestbook/${messageId}`, {
        method: 'DELETE',
      })
    } catch (err) {
      throw err
    }
  }

  return {
    entries: data,
    addEntry,
    deleteEntry,
    loading,
    mutate,
  }
}

export default useGuestbook
