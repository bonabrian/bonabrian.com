'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import { Button, Container, Link, Spinner } from '@/components/ui'
import cn from '@/lib/cn'
import type { SkillCategory } from '@/types/skill'

import useEndorsements from '../hooks/use-endorsements'
import EndorsementsBadge from './endorsement-badge'

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
          'relative max-w-lg rounded-lg border border-transparent bg-background p-4',
          'after:absolute after:-inset-1 after:-z-10 after:rounded-[calc(8px+3px)] after:bg-rainbow-gradient after:content-[""]',
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
            <h3 className={cn('mb-4 font-bold', 'md:text-2xl')}>Skills</h3>
            <div className={cn('space-y-8')}>
              {endorsements.map((category) => (
                <div key={category.name}>
                  <h4
                    className={cn(
                      'my-4 text-lg font-semibold leading-5 text-accent-foreground',
                      'md:text-xl',
                    )}
                  >
                    {category.name}
                  </h4>
                  <div
                    className={cn(
                      'grid grid-flow-row auto-rows-auto grid-cols-1 gap-4',
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
