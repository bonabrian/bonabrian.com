'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import { ArrowsOutSimple, Close, Minus } from '@/components/icons'
import { ROUTES } from '@/constants/links'
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
        'flex items-center justify-between p-4 font-plus-jakarta font-medium border-muted',
      )}
    >
      <div className={cn('flex items-center gap-4')}>
        <div className={cn('flex gap-2')}>
          <div
            className={cn(
              'group flex items-center justify-center w-3.5 h-3.5 rounded-full cursor-pointer bg-[#FF605C] text-neutral-800',
            )}
            onClick={onClose}
          >
            <Close className={cn('w-2 h-2 hidden', 'group-hover:flex')} />
          </div>
          <div
            className={cn(
              'group flex items-center justify-center w-3.5 h-3.5 rounded-full cursor-pointer bg-[#FFBD44] text-neutral-800',
            )}
            onClick={onClose}
          >
            <Minus className={cn('w-2 h-2 hidden', 'group-hover:flex')} />
          </div>
          <div
            className={cn(
              'group flex items-center justify-center w-3.5 h-3.5 rounded-full cursor-pointer bg-[#00CA4E] text-neutral-800',
            )}
            onClick={() => router.push(ROUTES.guestbook)}
          >
            <ArrowsOutSimple
              className={cn('w-2 h-2 hidden', 'group-hover:flex')}
            />
          </div>
        </div>
        <h4>Guestbook</h4>
      </div>
      {session && (
        <div
          className={cn('font-semibold underline text-sm cursor-pointer')}
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
