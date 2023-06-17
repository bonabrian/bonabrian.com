'use client'

import cx from 'classnames'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import { useEndorsements } from '@/hooks'
import type { SkillCategory } from '@/types'

import Container from './container'
import EndorsementsBadge from './endorsements-badge'
import Link from './link'
import Spinner from './spinner'

interface EndorsementsProps {
  fallbackData: Array<SkillCategory>
}

const Endorsements = ({ fallbackData }: EndorsementsProps) => {
  const { data: session } = useSession()

  const { endorsements, error } = useEndorsements({ fallbackData })
  const [isLoading, setIsLoading] = useState(false)

  const onSignIn = async () => {
    setIsLoading(true)
    await signIn()
    setIsLoading(false)
  }

  return (
    <Container>
      <div>
        <div
          className={cx(
            'inline-flex flex-col items-start p-6 border-2 border-primary-600 rounded-2xl',
            'dark:border-primary-400',
          )}
        >
          {session?.user ? (
            <>
              <p className={cx('text-gray-700', 'dark:text-slate-50')}>
                You are currently logged in as{' '}
                <span className={cx('font-semibold')}>{session.user.name}</span>
              </p>
              {isLoading ? (
                <Spinner />
              ) : (
                <Link
                  href="/api/auth/signout"
                  className={cx('font-semibold underline')}
                  onClick={async (e) => {
                    e.preventDefault()
                    setIsLoading(true)
                    await signOut()
                    setIsLoading(false)
                  }}
                >
                  Logout
                </Link>
              )}
            </>
          ) : (
            <>
              <h2
                className={cx(
                  'font-semibold text-gray-700',
                  'dark:text-slate-50',
                )}
              >
                Please log in to provide your valuable endorsement.
              </h2>
              <button
                className={cx(
                  'button button--rounded button--shadow px-8 my-4',
                  'disabled:cursor-not-allowed',
                )}
                onClick={onSignIn}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Login'}
              </button>
              <p
                className={cx(
                  'text-xs text-gray-900/60',
                  'dark:text-slate-100/70',
                )}
              >
                Your information, including your name and profile picture, will
                only be utilized for he purpose of properly displaying your
                identity as an endorser.
              </p>
            </>
          )}
        </div>
      </div>

      <div className={cx('mt-12')}>
        {endorsements && !error && (
          <div className={cx('flex flex-col')}>
            <h3
              className={cx(
                'font-bold mb-4 text-gray-700 text-xl',
                'md:text-2xl',
                'dark:text-slate-50',
              )}
            >
              Skills
            </h3>
            <div
              className={cx(
                'space-y-8 divide-y divide-slate-200',
                'dark:divide-gray-800',
              )}
            >
              {endorsements.map((category) => (
                <div key={category.name}>
                  <h4
                    className={cx(
                      'my-4 font-semibold leading-5 text-lg',
                      'md:text-xl',
                    )}
                  >
                    {category.name}
                  </h4>
                  <div
                    className={cx(
                      'grid grid-cols-1 grid-flow-row auto-rows-auto gap-4',
                      'md:grid-cols-2',
                    )}
                  >
                    {category?.skills?.map((skill) => (
                      <EndorsementsBadge
                        key={skill.id}
                        skill={skill}
                        user={session?.user}
                        currentUserId={session?.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Endorsements
