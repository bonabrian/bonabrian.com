import Image from 'next/image'
import type { DefaultSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
import { RiErrorWarningLine } from 'react-icons/ri'
import { useSWRConfig } from 'swr'

import fireConfetti from '@/lib/confetti'
import type { Skill } from '@/types'

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

    mutate('/api/skills')
    setState(STATES.SUCCESS)
    fireConfetti()
  }

  return (
    <div className="flex flex-col items-stretch flex-nowrap bg-slate-200/40 dark:bg-gray-800/30 p-4 rounded-lg gap-4">
      <div className="flex justify-between items-center text-base">
        <div className="font-bold">{skill.name}</div>
        {state === STATES.LOADING ? (
          <Spinner />
        ) : isEndorsedByUser ? (
          <button
            type="button"
            className="relative px-3 py-1 text-sm gap-1 overflow-hidden inline-flex -tracking-tighter justify-center items-center outline-none transition duration-300 ease-in-out bg-transparent hover:bg-slate-200 dark:hover:bg-gray-800 rounded-full cursor-not-allowed"
            title="You already endorsed this skill!"
            disabled
          >
            <span>Endorsed</span>
            <BsPatchCheckFill size={14} className="fill-blue-500" />
          </button>
        ) : (
          <button
            type="button"
            className="relative px-3 py-1 text-sm overflow-hidden inline-flex -tracking-tighter justify-center items-center outline-none transition duration-300 ease-in-out bg-transparent hover:bg-primary-500 hover:text-white border border-solid border-gray-900 dark:border-slate-100 rounded-full shadow-[3px_3px_rgb(0_0_0_/_20%)] dark:shadow-[3px_3px_rgb(163_163_163_/_20%)]"
            title={`Endorse ${skill.name}`}
            onClick={() => onEndorse(skill.id)}
          >
            Endorse
          </button>
        )}
      </div>
      <div className="flex items-center -space-x-1">
        {skill.users.map((user) => (
          <div key={user.id} title={user.name} className="relative w-8 h-8">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="rounded-full ring-2 ring-white"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <Image
                src={`https://ui-avatars.com/api?name=${user.name}&background=B191FF&color=fff&rounded=true`}
                alt={user.name}
                fill
                className="rounded-full ring-2 ring-white"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        ))}
      </div>
      {skill.users.length > 0 && (
        <div className="text-sm">
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
        <p className="flex items-center text-sm my-1 sm:my-2 text-red-500 font-medium">
          <RiErrorWarningLine className="mr-1" size={14} />
          An unexpected error occurred.
        </p>
      )}
      {state === STATES.SUCCESS && (
        <p className="flex items-center text-sm my-1 sm:my-2 text-green-500 font-medium">
          <GiCheckMark className="mr-1" size={14} />
          Thanks for endorsing me.
        </p>
      )}
    </div>
  )
}

export default EndorsementsBadge
