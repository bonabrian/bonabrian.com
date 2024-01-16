import useRequest from '@/hooks/use-request'
import type { GuestbookEntry } from '@/types/guestbook'

const useGuestbook = () => {
  const { data, loading, mutate } =
    useRequest<GuestbookEntry[]>('/api/guestbook')

  const addEntry = async (message: string) => {
    try {
      await fetch('/api/guestbook', {
        method: 'POST',
        body: JSON.stringify({ message }),
      })
    } catch (err) {
      console.error('An error occurred on addEntry: ', err)
    }
  }

  const deleteEntry = async (messageId: string) => {
    try {
      await fetch(`/api/guestbook/${messageId}`, {
        method: 'DELETE',
      })
    } catch (err) {
      console.error('An error occurred on deleteEntry: ', err)
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
