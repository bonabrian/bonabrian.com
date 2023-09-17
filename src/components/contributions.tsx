'use client'

import { useContributions } from '@/hooks'
import cn from '@/lib/cn'

import { EmptyState, Spinner } from './common'
import ContributionCalendar from './contribution-calendar'
import ContributionOverview from './contribution-overview'
import { GitHub } from './icons'
import Link from './link'

interface ContributionsProps {
  username: string
  endpoint: string
}

const Contributions = ({ username, endpoint }: ContributionsProps) => {
  const { data, loading } = useContributions(endpoint)
  const contributionCalendar =
    data?.contributionsCollection?.contributionCalendar

  return (
    <div className={cn('flex flex-col gap-y-2')}>
      <div className={cn('flex items-center gap-1 text-xl font-medium')}>
        <GitHub />
        <h2 className={cn('capitalize')}>Contributions</h2>
      </div>
      <div
        className={cn(
          'flex flex-col justify-between gap-2',
          'md:flex-row md:items-center',
        )}
      >
        <p>My contributions from last year on GitHub.</p>
        <Link
          href={`https://github.com/${username}`}
          target="_blank"
          passHref
          className={cn(
            'text-sm font-fira-code text-muted-foreground',
            'hover:text-foreground',
          )}
          showExternalLinkIcon={false}
        >
          @{username}
        </Link>
      </div>

      {loading ? (
        <div className={cn('flex items-center justify-center')}>
          <Spinner />
        </div>
      ) : (
        <>
          {data ? (
            <div className={cn('space-y-3')}>
              <ContributionOverview data={contributionCalendar} />
              <ContributionCalendar data={contributionCalendar} />
            </div>
          ) : (
            <EmptyState message="No contributions data." />
          )}
        </>
      )}
    </div>
  )
}

export default Contributions
