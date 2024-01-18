import Image from 'next/image'
import type { DefaultSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import { Check, ExclamationCircle, Heart, Medal } from '@/components/icons'
import { Button, Spinner, Tooltip } from '@/components/ui'
import site from '@/config/site'
import type { Skill } from '@/types/skill'
import cn from '@/utils/cn'

interface BadgeProps {
  skill: Skill
  user: DefaultSession['user']
  currentUserId?: string
}

enum STATE {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

const Badge = ({ skill, user, currentUserId }: BadgeProps) => {
  const { id, name, users } = skill
  const [state, setState] = useState(STATE.IDLE)
  const { mutate } = useSWRConfig()

  const isEndorsedByUser = skill?.users?.find(
    (user) => user.id === currentUserId,
  )

  const isLoggedIn = Boolean(user)

  const onEndorse = async (skillId: string) => {
    setState(STATE.LOADING)

    if (!isLoggedIn) {
      await signIn()
      return
    }

    const res = await fetch('/api/endorsements', {
      body: JSON.stringify({ skillId }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    const isSuccess = res.ok

    if (!isSuccess) {
      setState(STATE.ERROR)
      return
    }

    mutate('/api/endorsements')
    setState(STATE.SUCCESS)
  }

  const isMySelf = user?.email === site.author.email

  return (
    <div
      className={cn(
        'flex flex-col flex-nowrap items-stretch gap-4 rounded-xl bg-card p-4 shadow-border',
      )}
    >
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('font-cal')}>{name}</div>
        {state === STATE.LOADING ? (
          <Spinner />
        ) : (
          <>
            {isMySelf ? (
              <Button variant="ghost">
                <Heart className={cn('fill-red-500 text-red-500')} />
              </Button>
            ) : (
              <>
                {isEndorsedByUser ? (
                  <Button
                    variant="ghost"
                    className={cn(
                      'gap-1 px-3 py-1',
                      'hover:bg-background hover:text-foreground',
                      'disabled:cursor-not-allowed disabled:opacity-100',
                    )}
                    title="You already endorsed this skill!"
                    disabled
                  >
                    <span>Endorsed</span>
                    <Medal />
                  </Button>
                ) : (
                  <Button
                    variant="shadow"
                    title={`Endorse ${name}`}
                    onClick={() => onEndorse(id)}
                    size="sm"
                  >
                    Endorse
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className={cn('flex items-center -space-x-1')}>
        {users.map((user) => (
          <Tooltip key={user.id} title={user.name}>
            <div className={cn('group')}>
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={32}
                  height={32}
                  className={cn(
                    'rounded-full ring-2 ring-background transition-transform duration-200 ease-out',
                    'group-hover:translate-x-0.5',
                  )}
                />
              ) : (
                <Image
                  src={`https://ui-avatars.com/api?name=${user.name}&background=B191FF&color=fff&rounded=true`}
                  alt={user.name}
                  width={32}
                  height={32}
                  className={cn(
                    'rounded-full ring-2 ring-background transition-transform duration-200 ease-out',
                    'group-hover:translate-x-0.5',
                  )}
                />
              )}
            </div>
          </Tooltip>
        ))}
      </div>
      {users.length > 0 && (
        <div className={cn('text-sm')}>
          <p>
            <strong>{users.length}</strong>{' '}
            {`${name} endorsement${users.length > 1 ? 's' : ''} from:`}
          </p>
          <p>{users.map((user) => user.name).join(', ')}</p>
        </div>
      )}
      {state === STATE.ERROR && (
        <p
          className={cn(
            'my-1 flex items-center text-sm text-red-500',
            'sm:my-2',
          )}
        >
          <ExclamationCircle className={cn('mr-1')} />
          An unexpected error occurred.
        </p>
      )}
      {state === STATE.SUCCESS && (
        <p
          className={cn(
            'my-1 flex items-center text-sm text-green-500',
            'sm:my-2',
          )}
        >
          <Check className={cn('mr-1')} />
          Thank you for endorsing me.
        </p>
      )}
    </div>
  )
}

export default Badge
