import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { Trash } from '@/components/icons'
import { siteConfig } from '@/data/app'
import cn from '@/lib/cn'
import type { GuestbookEntry as Entry } from '@/types/guestbook'

import MessageTimestamp from './message-timestamp'

interface GuestbookEntryProps {
  entry: Entry
  onDelete: (id: string) => Promise<void>
}

const GuestbookEntry = ({ entry, onDelete }: GuestbookEntryProps) => {
  const { id, body, createdAt, user } = entry
  const { name, email, image } = user
  const { data: session } = useSession()

  const authorEmail = siteConfig.author.email
  const isAuthor = email === authorEmail

  return (
    <div className={cn('flex items-start gap-3 px-3')}>
      <Image
        src={image}
        width={40}
        height={40}
        alt={user.name}
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
            <div className={cn('text-sm font-semibold')}>{name}</div>
            {isAuthor && (
              <div
                className={cn(
                  'rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary',
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
        <div className={cn('group flex items-center gap-3')}>
          <p
            className={cn(
              'w-fit rounded-md rounded-tl-none bg-muted px-3 py-2',
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
