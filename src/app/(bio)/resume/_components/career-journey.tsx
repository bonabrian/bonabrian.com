'use client'

import { m, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

import { Container, Link } from '@/components/ui'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'

import { experiences } from '../_constants/experiences'
import AvailableForHire from './available-for-hire'
import DownloadResume from './download-resume'

interface CareerJourneyProps {
  isAvailableAnimationDuration?: number
}

const CareerJourney = ({
  isAvailableAnimationDuration = 10,
}: CareerJourneyProps) => {
  const isAvailable = process.env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE === 'true'
  const shouldReduceMotion = useReducedMotion()

  const isAvailableVariants = {
    hide: { x: 0, opacity: 1 },
    show: { x: shouldReduceMotion ? 0 : -32, opacity: 0 },
  }

  const animation = {
    hide: { x: -16, opacity: 0 },
    show: { x: 0, opacity: 1 },
  }

  const lastUpdated = formatDate('2023-06-22T15:47:00.000Z')

  return (
    <Container>
      <m.div
        initial="hide"
        animate="show"
        className={cn('relative mb-12', 'md:mb-16')}
      >
        {isAvailable ? (
          <m.div variants={animation} transition={{ delay: 1 }}>
            <m.div
              variants={isAvailableVariants}
              transition={{
                delay: isAvailableAnimationDuration + 1.5,
                duration: 0.4,
              }}
            >
              <AvailableForHire />
            </m.div>
            <m.div
              initial={{ x: -32, opacity: 0, pointerEvents: 'none' }}
              animate={{ x: 0, opacity: 1, pointerEvents: 'auto' }}
              transition={{
                delay: isAvailableAnimationDuration + 1.6,
                duration: 0.4,
              }}
              className={cn('absolute top-0 left-0')}
            >
              <DownloadResume />
            </m.div>
          </m.div>
        ) : (
          <m.div variants={animation} transition={{ delay: 0.3 }}>
            <DownloadResume />
          </m.div>
        )}
      </m.div>

      <div className={cn('px-4 prose max-w-none', 'dark:prose-dark')}>
        <ol className={cn('relative border-l border-muted list-none')}>
          {experiences.map(
            ({ organization, role, date, stacks, accomplishments }) => (
              <li key={organization.name} className={cn('ml-3', 'sm:ml-6')}>
                <div
                  className={cn(
                    'absolute mt-0 -left-5 w-10 h-10 flex justify-center items-center rounded-ful',
                  )}
                >
                  <Image
                    src={organization.logo}
                    alt={organization.name}
                    fill
                    className={cn('rounded-full my-0')}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className={cn(
                    'flex flex-col items-start justify-between gap-2',
                    'md:flex-row md:items-center',
                  )}
                >
                  <h3 className={cn('text-lg my-0')}>
                    <Link
                      href={organization.url}
                      className={cn(
                        'no-underline font-bold text-foreground hover:text-foreground',
                      )}
                      showExternalLinkIcon={false}
                    >
                      {organization.name}
                    </Link>
                    <span
                      className={cn(
                        "before:content-['_|_'] font-normal text-muted-foreground",
                      )}
                    >
                      {role}
                    </span>
                  </h3>
                  <p className={cn('my-0 text-muted-foreground')}>{date}</p>
                </div>
                <div className={cn('flex flex-row flex-wrap gap-2 my-8')}>
                  {stacks.map(({ name, backgroundColor, color, icon }) => (
                    <span
                      key={name}
                      className={cn(
                        'rounded-full px-2.5 py-1 capitalize font-semibold text-xs flex items-center gap-1',
                      )}
                      style={{ backgroundColor, color }}
                    >
                      {icon}
                      {name}
                    </span>
                  ))}
                </div>
                <ul>
                  {accomplishments.map((accomplishment) => (
                    <li key={accomplishment}>
                      <span className={cn('text-accent-foreground')}>
                        {accomplishment}
                      </span>
                    </li>
                  ))}
                </ul>
                <hr className={cn('my-8 border-muted')} />
              </li>
            ),
          )}
        </ol>
        <div className={cn('mt-16')}>
          <p className={cn('text-muted-foreground')}>
            Last updated at <time dateTime={lastUpdated}>{lastUpdated}</time>
          </p>
        </div>
      </div>
    </Container>
  )
}

export default CareerJourney
