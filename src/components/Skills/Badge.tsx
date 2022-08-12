import Image from 'next/image'
import type { DefaultSession } from 'next-auth'
import { useState } from 'react'
import { BsPlusSquare } from 'react-icons/bs'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { RiUserLine } from 'react-icons/ri'
import { useSWRConfig } from 'swr'

import fireConfetti from '@/lib/confetti'
import { FormState } from '@/types/form'
import type { Skill } from '@/types/skill'

import ErrorMessage from '../ErrorMessage'
import LoadingSpinner from '../LoadingSpinner'
import SuccessMessage from '../SuccessMessage'

type BadgeProps = {
  skill: Skill
  user: DefaultSession['user']
  currentUserId: string
}

const Badge = ({ skill, user, currentUserId }: BadgeProps) => {
  const [state, setState] = useState<FormState>(FormState.INITIAL)
  const { mutate } = useSWRConfig()

  const onEndorse = async (skillId: string) => {
    setState(FormState.LOADING)

    const res = await fetch('/api/endorsement', {
      body: JSON.stringify({ skillId }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    const isError = !res.ok

    if (isError) {
      setState(FormState.ERROR)
      return
    }

    mutate('/api/skill-category')
    setState(FormState.SUCCESS)
    fireConfetti()
  }

  const isUserEndorsed = skill?.users?.find((u) => u.id === currentUserId)
  const isLoggedIn = Boolean(user)

  return (
    <div className='space-y-4'>
      <div className='flex items-center text-base font-semibold'>
        {state === FormState.LOADING ? (
          <div className='flex items-center justify-center w-8 h-8'>
            <LoadingSpinner />
          </div>
        ) : isUserEndorsed ? (
          <button
            className='font-semibold disabled:hover:cursor-not-allowed text-success-700 dark:text-success-400'
            title='You already endorsed this skill!'
            disabled
          >
            <IoMdCheckmarkCircleOutline className='inline w-8 h-8 fill-current' />
          </button>
        ) : (
          <button
            className='font-semibold disabled:hover:cursor-not-allowed text-primary-600 dark:text-primary-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:text-gray-700 dark:disabled:text-gray-300'
            disabled={!isLoggedIn}
            title={!isLoggedIn ? 'Please login first' : `Endorse ${skill.name}`}
            onClick={() => onEndorse(skill.id)}
          >
            <BsPlusSquare className='inline w-8 h-8 fill-current' />
          </button>
        )}
        <span className='ml-2'>{skill.name}</span>
      </div>
      <div className='flex items-center gap-1 flex-wrap'>
        {skill.users.map((u) => (
          <span key={u.id} title={u.name} className='w-8 h-8'>
            {u.image ? (
              <Image
                src={u.image}
                alt={u.name}
                width={32}
                height={32}
                className='rounded-full'
              />
            ) : (
              <RiUserLine className='w-8 h-8 p-0.5 rounded-full fill-current text-primary-600 dark:text-primary-400 border-2 border-solid border-primary-600 dark:border-primary-400' />
            )}
          </span>
        ))}
      </div>
      {skill.users.length > 0 && (
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          <strong className='text-black dark:text-white'>
            {skill.users.length}
          </strong>{' '}
          {`${skill.name} endorsement ${
            skill.users.length > 1 ? 's' : ''
          } from:`}
          <span className='mx-2'>
            {skill.users.map((u) => u.name).join(', ')}
          </span>
        </p>
      )}
      {state === FormState.ERROR && (
        <ErrorMessage>An unexpected error occurred.</ErrorMessage>
      )}
      {state === FormState.SUCCESS && (
        <SuccessMessage>Thank you for your endorsement!</SuccessMessage>
      )}
    </div>
  )
}

export default Badge
