import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { Trash } from '@/components/icons'
import cn from '@/lib/cn'
import { defaultMetadata } from '@/lib/metadata'

import type { GuestbookEntry as Entry } from '../_types/guestbook'
import MessageTimestamp from './message-timestamp'

interface GuestbookEntryProps {
  entry: Entry
  onDelete: (id: string) => Promise<void>
}

const GuestbookEntry = ({ entry, onDelete }: GuestbookEntryProps) => {
  const { id, body, createdAt, user } = entry
  const { name, email, image } = user
  const { data: session } = useSession()

  const authorEmail = defaultMetadata.author.email
  const isAuthor = email === authorEmail

  return (
    <div className={cn('flex items-start gap-3 px-3 font-plus-jakarta')}>
      <Image
        src={image}
        width={40}
        height={40}
        alt="Faking Name"
        className={cn('rounded-full aspect-square')}
      />
      <div className={cn('space-y-1')}>
        <div
          className={cn(
            'flex flex-col items-start gap-3',
            'md:flex-row md:items-center',
          )}
        >
          <div className={cn('flex items-center gap-2')}>
            <div className={cn('font-semibold text-sm')}>{name}</div>
            {isAuthor && (
              <div
                className={cn(
                  'bg-primary/10 text-primary px-1.5 py-0.5 font-medium rounded-full text-xs',
                  'dark:bg-primary/20',
                )}
              >
                Author
              </div>
            )}
            <div className={cn('hidden', 'md:flex')}>
              <MessageTimestamp datetime={createdAt} />
            </div>
          </div>
        </div>
        <div className={cn('flex items-center gap-3 group')}>
          <p
            className={cn(
              'w-fit bg-muted rounded-md py-2 px-3 rounded-tl-none',
            )}
          >
            {body}
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
        <div className={cn('flex', 'md:hidden')}>
          <MessageTimestamp datetime={createdAt} />
        </div>
      </div>
    </div>
  )
}

export default GuestbookEntry
