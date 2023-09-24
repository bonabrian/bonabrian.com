'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import { Button, Container, Link, Spinner } from '@/components/ui'
import cn from '@/lib/cn'

import EndorsementsBadge from './endorsements-badge'
import { useEndorsements } from './hooks'
import type { SkillCategory } from './types'

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
      <div
        className={cn(
          'relative p-4 rounded-lg border border-transparent bg-background max-w-lg',
          'after:absolute after:-inset-1 after:-z-10 after:rounded-[calc(8px+3px)] after:content-[""] after:bg-rainbow-gradient',
        )}
      >
        {session?.user ? (
          <>
            <p>
              You are currently logged in as{' '}
              <span className={cn('font-semibold')}>{session.user.name}</span>
            </p>
            {isLoading ? (
              <Spinner />
            ) : (
              <Link
                href="/api/auth/signout"
                className={cn('font-semibold underline')}
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
          <div className={cn('space-y-4')}>
            <h2 className={cn('font-semibold')}>
              Please log in to provide your valuable endorsement.
            </h2>
            <Button
              variant="outline"
              onClick={onSignIn}
              disabled={isLoading}
              className={cn('hover:bg-accent hover:text-accent-foreground')}
            >
              {isLoading ? <Spinner /> : 'Login'}
            </Button>
            <p className={cn('text-sm text-muted-foreground')}>
              Your information, including your name and profile picture, will
              only be utilized to properly display your identity as an endorser.
            </p>
          </div>
        )}
      </div>

      <div className={cn('mt-12')}>
        {endorsements && !error && (
          <div className={cn('flex flex-col')}>
            <h3 className={cn('font-bold mb-4', 'md:text-2xl')}>Skills</h3>
            <div className={cn('space-y-8')}>
              {endorsements.map((category) => (
                <div key={category.name}>
                  <h4
                    className={cn(
                      'my-4 font-semibold leading-5 text-lg text-accent-foreground',
                      'md:text-xl',
                    )}
                  >
                    {category.name}
                  </h4>
                  <div
                    className={cn(
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
