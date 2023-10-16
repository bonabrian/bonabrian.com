'use client'

import { m, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

import { Container, Link } from '@/components/ui'
import { env } from '@/data/env'
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
  const isAvailable = env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE
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
              className={cn('absolute left-0 top-0')}
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

      <div className={cn('prose max-w-none px-4', 'dark:prose-dark')}>
        <ol className={cn('relative list-none border-l border-muted')}>
          {experiences.map(
            ({ organization, role, date, stacks, accomplishments }) => (
              <li key={organization.name} className={cn('ml-3', 'sm:ml-6')}>
                <div
                  className={cn(
                    'rounded-ful absolute -left-5 mt-0 flex h-10 w-10 items-center justify-center',
                  )}
                >
                  <Image
                    src={organization.logo}
                    alt={organization.name}
                    fill
                    className={cn('my-0 rounded-full')}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className={cn(
                    'flex flex-col items-start justify-between gap-2',
                    'md:flex-row md:items-center',
                  )}
                >
                  <h3 className={cn('my-0 text-lg')}>
                    <Link
                      href={organization.url}
                      className={cn(
                        'font-bold text-foreground no-underline hover:text-foreground',
                      )}
                      showExternalLinkIcon={false}
                    >
                      {organization.name}
                    </Link>
                    <span
                      className={cn(
                        "font-normal text-muted-foreground before:content-['_|_']",
                      )}
                    >
                      {role}
                    </span>
                  </h3>
                  <p className={cn('my-0 text-muted-foreground')}>{date}</p>
                </div>
                <div className={cn('my-8 flex flex-row flex-wrap gap-2')}>
                  {stacks.map(({ name, backgroundColor, color, icon }) => (
                    <span
                      key={name}
                      className={cn(
                        'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
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
