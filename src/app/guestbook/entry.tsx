import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { Trash } from '@/components/icons'
import site from '@/config/site'
import type { GuestbookEntry } from '@/types/guestbook'
import cn from '@/utils/cn'

import Timestamp from './timestamp'

interface EntryProps {
  entry: GuestbookEntry
  onDelete: (id: string) => Promise<void>
}

const Entry = ({ entry, onDelete }: EntryProps) => {
  const { id, body, createdAt, user } = entry
  const { name, email, image } = user
  const { data: session } = useSession()

  const authorEmail = site.author.email
  const isAuthor = email === authorEmail

  const pattern = /@([^:]+):/g

  const modifiedMessage = body?.split(pattern)?.map((message, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} className={cn('text-sm font-semibold text-primary')}>
          @{message}
        </span>
      )
    }

    return <span key={index}>{message}</span>
  })

  return (
    <div className={cn('flex items-start gap-3 px-3')}>
      <Image
        src={image}
        width={40}
        height={40}
        alt={name}
        className={cn('aspect-square rounded-full')}
      />
      <div className={cn('space-y-1')}>
        <div
          className={cn(
            'flex flex-col items-start gap-3',
            'md:flex-row md:items-center',
          )}
        >
          <div className={cn('flex items-center gap-2')}>
            <div className={cn('font-cal text-sm')}>{name}</div>
            {isAuthor && (
              <div
                className={cn(
                  'rounded-full bg-primary/10 px-1.5 py-0.5 font-cal text-xs text-primary',
                  'dark:bg-primary/20',
                )}
              >
                Author
              </div>
            )}
            <div className={cn('hidden', 'md:flex')}>
              <Timestamp datetime={createdAt} />
            </div>
          </div>
        </div>
        <div className={cn('group flex items-center gap-3')}>
          <p
            className={cn(
              'w-fit rounded-xl rounded-tl-none bg-muted px-3 py-2',
            )}
          >
            {modifiedMessage}
          </p>
          <div className={cn('flex items-center')}>
            {(session?.user?.email === email ||
              session?.user?.email === authorEmail) && (
              <div
                className={cn(
                  'hidden cursor-pointer text-red-500',
                  'group-hover:flex',
                )}
                onClick={async () => await onDelete(id)}
              >
                <Trash />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Entry
