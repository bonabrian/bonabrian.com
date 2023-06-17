import cx from 'classnames'
import Image from 'next/image'
import type { DefaultSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import fireConfetti from '@/lib/confetti'
import { defaultMetadata } from '@/lib/metadata'
import type { Skill } from '@/types'

import { Check, CheckBadge, ExclamationCircle, Heart } from './icons'
import Spinner from './spinner'

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
      className={cx(
        'flex flex-col items-stretch flex-nowrap bg-slate-200/40 p-4 rounded-lg gap-4',
        'dark:bg-gray-800/30',
      )}
    >
      <div className={cx('flex justify-between items-center')}>
        <div className={cx('font-bold')}>{skill.name}</div>
        {state === STATES.LOADING ? (
          <Spinner />
        ) : (
          <>
            {isMySelf ? (
              <button
                type="button"
                className={cx(
                  'button button--rounded cursor-not-allowed px-3 py-1 gap-1 border-none hover:bg-transparent',
                )}
                disabled
              >
                <Heart className={cx('fill-red-500')} />
              </button>
            ) : (
              <>
                {isEndorsedByUser ? (
                  <button
                    type="button"
                    className={cx(
                      'button button--rounded cursor-not-allowed px-3 py-1 gap-1 border-none hover:bg-transparent',
                    )}
                    title="You already endorsed this skill!"
                    disabled
                  >
                    <span>Endorsed</span>
                    <CheckBadge className={cx('fill-blue-500')} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={cx(
                      'button button--rounded button--shadow px-3 py-1.5 h-8',
                    )}
                    title={`Endorse ${skill.name}`}
                    onClick={() => onEndorse(skill.id)}
                  >
                    Endorse
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className={cx('flex items-center -space-x-1')}>
        {skill.users.map((user) => (
          <div
            key={user.id}
            title={user.name}
            className={cx('relative w-8 h-8')}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                className={cx('rounded-full ring-2 ring-white')}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <Image
                src={`https://ui-avatars.com/api?name=${user.name}&background=B191FF&color=fff&rounded=true`}
                alt={user.name}
                fill
                className={cx('rounded-full ring-2 ring-white')}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        ))}
      </div>
      {skill.users.length > 0 && (
        <div className={cx('text-sm')}>
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
          className={cx(
            'flex items-center text-sm my-1 text-red-500 font-medium',
            'sm:my-2',
          )}
        >
          <ExclamationCircle className={cx('mr-1')} />
          An unexpected error occurred.
        </p>
      )}
      {state === STATES.SUCCESS && (
        <p
          className={cx(
            'flex items-center text-sm my-1 text-green-500 font-medium',
            'sm:my-2',
          )}
        >
          <Check className={cx('mr-1')} />
          Thanks for endorsing me.
        </p>
      )}
    </div>
  )
}

export default EndorsementsBadge
