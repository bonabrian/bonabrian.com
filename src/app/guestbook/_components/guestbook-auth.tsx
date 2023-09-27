import { signIn } from 'next-auth/react'

import { GitHub, Google } from '@/components/icons'
import { Button } from '@/components/ui'
import cn from '@/lib/cn'

const GuestbookAuth = () => {
  return (
    <div
      className={cn('flex flex-col border-t border-muted font-plus-jakarta')}
    >
      <div className={cn('p-4 space-y-3')}>
        <p className={cn('text-center text-sm')}>
          Kindly log in to begin typing.
        </p>
        <div className={cn('grid grid-cols-2 gap-2', 'md:gap-4')}>
          <Button
            variant="ghost"
            className={cn(
              'flex items-center gap-3 text-xs font-medium border border-foreground',
              'sm:text-sm',
            )}
            onClick={() => signIn('github')}
          >
            <GitHub className={cn('hidden', 'sm:flex')} />
            <span>Sign in with GitHub</span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              'flex items-center gap-3 text-xs font-medium border border-foreground',
              'sm:text-sm',
            )}
            onClick={() => signIn('google')}
          >
            <Google className={cn('hidden', 'sm:flex')} />
            <span>Sign in with Google</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GuestbookAuth
