'use client'

import { useEffect, useRef, useState } from 'react'

import cn from '@/lib/cn'

import type { GuestbookEntry as Entry } from '../_types/guestbook'
import GuestbookEntry from './guestbook-entry'

const WIDGET_HEIGHT = 500
const HEIGHT_GAP = 256

interface GuestbookEntriesProps {
  onDeleteMessage: (id: string) => Promise<void>
  isWidget?: boolean
  entries?: Entry[]
}

const GuestbookEntries = ({
  onDeleteMessage,
  isWidget = false,
  entries,
}: GuestbookEntriesProps) => {
  const entriesRef = useRef<HTMLDivElement | null>(null)
  const [hasScrolledUp, setHasScrolledUp] = useState(false)
  const [entriesHeight, setEntriesHeight] = useState(WIDGET_HEIGHT - HEIGHT_GAP)

  useEffect(() => {
    const handleScroll = () => {
      if (entriesRef.current) {
        const isScrolledToBottom =
          entriesRef.current.scrollHeight - entriesRef.current.clientHeight <=
          entriesRef.current.scrollTop + 5

        setHasScrolledUp(!isScrolledToBottom)
      }
    }

    entriesRef.current?.addEventListener('scroll', handleScroll)

    const currentEntriesRef = entriesRef.current

    return () => {
      currentEntriesRef?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (entriesRef.current && !hasScrolledUp) {
      entriesRef.current.scrollTop = entriesRef.current.scrollHeight
    }
  }, [entries, hasScrolledUp])

  useEffect(() => {
    const handleResize = () => {
      const height = isWidget ? WIDGET_HEIGHT : window.innerHeight - HEIGHT_GAP
      setEntriesHeight(height)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isWidget])

  return (
    <div className={cn('px-1')}>
      <div
        ref={entriesRef}
        className={cn('overflow-hidden overflow-y-auto py-4 space-y-4')}
        style={{ height: entriesHeight }}
      >
        {entries?.length ? (
          <>
            {entries.map((entry) => (
              <GuestbookEntry
                key={entry.id}
                entry={entry}
                onDelete={onDeleteMessage}
              />
            ))}
          </>
        ) : (
          <div
            className={cn('flex flex-col justify-center h-full text-center')}
          >
            <p>
              If you come across this, you might just be the first to share your
              suggestions, ask questions, or contribute in any way you see fit.
            </p>
            <p>
              Simply <span className={cn('font-semibold')}>log in</span> to get
              started. :)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestbookEntries
