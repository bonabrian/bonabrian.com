import { signIn } from 'next-auth/react'

import { GitHub, Google } from '@/components/icons'
import { Button } from '@/components/ui'
import cn from '@/utils/cn'

const AuthCard = () => {
  return (
    <div className={cn('flex flex-col border-t border-muted')}>
      <div className={cn('space-y-3 p-4')}>
        <p className={cn('text-center text-sm')}>
          Kindly log in to begin typing.
        </p>
        <div className={cn('grid grid-cols-2 gap-2', 'md:gap-4')}>
          <Button
            variant="ghost"
            className={cn(
              'flex items-center gap-3 border border-foreground text-xs font-medium',
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
              'flex items-center gap-3 border border-foreground text-xs font-medium',
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

export default AuthCard
