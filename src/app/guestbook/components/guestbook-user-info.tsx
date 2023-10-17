import { signOut, useSession } from 'next-auth/react'

import { Link } from '@/components/ui'
import cn from '@/lib/cn'

interface GuestbookUserInfoProps {
  isWidget?: boolean
}

const GuestbookUserInfo = ({ isWidget = false }: GuestbookUserInfoProps) => {
  const { data: session } = useSession()

  return session ? (
    <div
      className={cn(
        'flex flex-col items-start gap-2 px-4 py-2',
        'md:flex-row md:items-center',
        isWidget ? 'text-xs' : 'text-sm',
      )}
    >
      <div className={cn('flex flex-wrap gap-1')}>
        <p>
          You are currently logged in as{' '}
          <span className={cn('font-semibold')}>{session.user.name}</span>
        </p>
        {!isWidget && (
          <Link
            href="/api/auth/signout"
            className={cn('font-semibold underline')}
            onClick={async (e) => {
              e.preventDefault()
              await signOut()
            }}
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  ) : null
}

export default GuestbookUserInfo
