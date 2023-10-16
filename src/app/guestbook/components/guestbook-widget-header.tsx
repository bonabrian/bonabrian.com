'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import { ArrowsOutSimple, Close, Minus } from '@/components/icons'
import { ROUTES } from '@/data/app'
import cn from '@/lib/cn'

interface GuestbookWidgetHeaderProps {
  onClose: () => void
}

const GuestbookWidgetHeader = ({ onClose }: GuestbookWidgetHeaderProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div
      className={cn(
        'flex items-center justify-between border-muted px-4 py-3 font-plus-jakarta font-medium',
      )}
    >
      <div className={cn('flex items-center gap-4')}>
        <div className={cn('flex gap-2')}>
          <div
            className={cn(
              'group flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full bg-[#FF605C] text-neutral-800',
            )}
            onClick={onClose}
          >
            <Close className={cn('hidden h-2 w-2', 'group-hover:flex')} />
          </div>
          <div
            className={cn(
              'group flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full bg-[#FFBD44] text-neutral-800',
            )}
            onClick={onClose}
          >
            <Minus className={cn('hidden h-2 w-2', 'group-hover:flex')} />
          </div>
          <div
            className={cn(
              'group flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full bg-[#00CA4E] text-neutral-800',
            )}
            onClick={() => router.push(ROUTES.guestbook)}
          >
            <ArrowsOutSimple
              className={cn('hidden h-2 w-2', 'group-hover:flex')}
            />
          </div>
        </div>
        <h4>Guestbook</h4>
      </div>
      {session && (
        <div
          className={cn('cursor-pointer text-sm font-semibold underline')}
          onClick={async () => {
            await signOut()
          }}
        >
          Logout
        </div>
      )}
    </div>
  )
}

export default GuestbookWidgetHeader
