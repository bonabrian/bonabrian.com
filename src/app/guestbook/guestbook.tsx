'use client'

import { useSession } from 'next-auth/react'

import { Skeleton } from '@/components/ui'
import cn from '@/utils/cn'

import AuthCard from './auth-card'
import Entries from './entries'
import MessagePanel from './message-panel'
import useGuestbook from './use-guestbook'

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
        <div className={cn('space-y-4 py-4')}>
          {[...Array(3)].map((_key, index) => (
            <div key={index} className={cn('flex items-start gap-3 px-3')}>
              <Skeleton className={cn('h-10 w-10 rounded-full')} />
              <div className={cn('w-full space-y-1')}>
                <div
                  className={cn(
                    'flex flex-col items-start gap-3',
                    'md:flex-row md:items-center',
                  )}
                >
                  <Skeleton className={cn('mb-2 h-4 w-full', 'md:w-1/2')} />
                </div>
                <div className={cn('flex items-center')}>
                  <Skeleton className={cn('h-16 w-full')} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Entries
            entries={entries}
            onDeleteMessage={onDeleteMessage}
            isWidget={isWidget}
          />

          {session ? (
            <MessagePanel onSendMessage={onSendMessage} isWidget={isWidget} />
          ) : (
            <AuthCard />
          )}
        </>
      )}
    </>
  )
}

export default Guestbook
