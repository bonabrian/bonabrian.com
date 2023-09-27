'use client'

import { useSession } from 'next-auth/react'

import { Spinner } from '@/components/ui'
import cn from '@/lib/cn'

import useGuestbook from '../_hook/use-guestbook'
import GuestbookAuth from './guestbook-auth'
import GuestbookEntries from './guestbook-entries'
import GuestbookPanel from './guestbook-panel'

interface GuestbookProps {
  isWidget?: boolean
}

const Guestbook = ({ isWidget = false }: GuestbookProps) => {
  const { data: session } = useSession()
  const { entries, addEntry, deleteEntry, loading, mutate } = useGuestbook()

  const onSendMessage = async (message: string) => {
    try {
      await addEntry(message)
      mutate()
    } catch (err) {
      console.error('An error occurred onSendMessage: ', err)
    }
  }

  const onDeleteMessage = async (messageId: string) => {
    try {
      await deleteEntry(messageId)
      mutate()
    } catch (err) {
      console.error('An error occurred onDeleteMessage: ', err)
    }
  }

  return (
    <>
      {loading ? (
        <div
          className={cn(
            'flex items-center justify-center',
            isWidget && 'md:w-[28rem]',
          )}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <GuestbookEntries
            entries={entries}
            onDeleteMessage={onDeleteMessage}
            isWidget={isWidget}
          />

          {session ? (
            <GuestbookPanel onSendMessage={onSendMessage} isWidget={isWidget} />
          ) : (
            <GuestbookAuth />
          )}
        </>
      )}
    </>
  )
}

export default Guestbook
