import Image from 'next/image'
import type { DefaultSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import { Check, ExclamationCircle, Heart, Medal } from '@/components/icons'
import { Button, Spinner } from '@/components/ui'
import cn from '@/lib/cn'
import fireConfetti from '@/lib/confetti'
import { defaultMetadata } from '@/lib/metadata'

import type { Skill } from '../_types/skill'

interface EndorsementsBadgeProps {
  skill: Skill
  user: DefaultSession['user']
  currentUserId?: string
}

const STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
}

const EndorsementsBadge = ({
  skill,
  user,
  currentUserId,
}: EndorsementsBadgeProps) => {
  const [state, setState] = useState(STATES.IDLE)
  const { mutate } = useSWRConfig()

  const isEndorsedByUser = skill?.users?.find(
    (user) => user.id === currentUserId,
  )

  const isLoggedIn = Boolean(user)

  const onEndorse = async (skillId: string) => {
    setState(STATES.LOADING)

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
      setState(STATES.ERROR)
      return
    }

    mutate('/api/endorsements')
    setState(STATES.SUCCESS)
    fireConfetti()
  }

  const isMySelf = user?.email === defaultMetadata.author.email

  return (
    <div
      className={cn(
        'flex flex-col flex-nowrap items-stretch gap-4 rounded-md bg-card p-4',
      )}
    >
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('font-bold')}>{skill.name}</div>
        {state === STATES.LOADING ? (
          <Spinner />
        ) : (
          <>
            {isMySelf ? (
              <Button variant="ghost">
                <Heart className={cn('fill-red-500')} />
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
                    variant="outline"
                    title={`Endorse ${skill.name}`}
                    onClick={() => onEndorse(skill.id)}
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
        {skill.users.map((user) => (
          <div
            key={user.id}
            title={user.name}
            className={cn('relative h-8 w-8')}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                className={cn('rounded-full ring-2 ring-background')}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <Image
                src={`https://ui-avatars.com/api?name=${user.name}&background=B191FF&color=fff&rounded=true`}
                alt={user.name}
                fill
                className={cn('rounded-full ring-2 ring-background')}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        ))}
      </div>
      {skill.users.length > 0 && (
        <div className={cn('text-sm')}>
          <p>
            <strong>{skill.users.length}</strong>{' '}
            {`${skill.name} endorsement${
              skill.users.length > 1 ? 's' : ''
            } from:`}
          </p>
          <p>{skill.users.map((user) => user.name).join(', ')}</p>
        </div>
      )}
      {state === STATES.ERROR && (
        <p
          className={cn(
            'my-1 flex items-center text-sm font-medium text-red-500',
            'sm:my-2',
          )}
        >
          <ExclamationCircle className={cn('mr-1')} />
          An unexpected error occurred.
        </p>
      )}
      {state === STATES.SUCCESS && (
        <p
          className={cn(
            'my-1 flex items-center text-sm font-medium text-green-500',
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

export default EndorsementsBadge
