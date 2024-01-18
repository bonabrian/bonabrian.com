'use client'

import { m, useInView } from 'framer-motion'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRef, useState } from 'react'

import { Button, Link, Spinner } from '@/components/ui'
import type { SkillCategory } from '@/types/skill'
import cn from '@/utils/cn'

import Badge from './badge'
import useEndorsements from './use-endorsements'

interface EndorsementsProps {
  fallbackData: SkillCategory[]
}

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

const Endorsements = ({ fallbackData }: EndorsementsProps) => {
  const { data: session } = useSession()
  const { endorsements, error } = useEndorsements({ fallbackData })

  const [isLoading, setIsLoading] = useState(false)

  const endorsementsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(endorsementsRef, { once: true, margin: '-100px' })

  const onSignIn = async () => {
    setIsLoading(true)
    await signIn()
    setIsLoading(false)
  }

  return (
    <>
      <m.div
        initial={{ visibility: 'hidden' }}
        animate={{ visibility: 'visible' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={cn(
          'relative max-w-lg rounded-lg border border-transparent bg-background p-3',
          'after:absolute after:-inset-1 after:-z-10 after:rounded-[calc(8px+3px)] after:bg-rainbow-gradient after:content-[""]',
        )}
      >
        {session?.user ? (
          <>
            <p>
              You are currently logged in as{' '}
              <span className={cn('font-cal font-bold')}>
                {session.user.name}
              </span>
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
          <div className={cn('flex flex-col items-start')}>
            <h2 className={cn('font-cal font-bold')}>
              Please log in to provide your valuable endorsements.
            </h2>
            <p className={cn('text-sm text-muted-foreground')}>
              Your information, including your name and profile picture, will
              only be utilized to properly display your identity as an endorser.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={onSignIn}
              disabled={isLoading}
              className={cn('mt-4')}
            >
              {isLoading ? <Spinner /> : 'Login to Endorse'}
            </Button>
          </div>
        )}
      </m.div>

      <m.div
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        variants={variants}
        ref={endorsementsRef}
        transition={{ duration: 0.5 }}
        className={cn('mt-8')}
      >
        {endorsements && !error && (
          <div className={cn('flex flex-col')}>
            <h3 className={cn('font-cal font-bold', 'md:text-2xl')}>Skills</h3>
            <div className={cn('space-y-8')}>
              {endorsements.map((category) => (
                <div key={category.name}>
                  <h4
                    className={cn(
                      'my-4 font-cal text-lg font-bold leading-5 text-accent-foreground',
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
                      <Badge
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
      </m.div>
    </>
  )
}

export default Endorsements
