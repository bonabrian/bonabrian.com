'use client'

import { GitHub } from '@/components/icons'
import { EmptyState, Link } from '@/components/ui'
import cn from '@/lib/cn'

import ContributionCalendar from './contribution-calendar'
import ContributionOverview from './contribution-overview'
import useContributions from './hooks/use-contributions'
import Section from './section'

interface ContributionsProps {
  username: string
  endpoint: string
}

const Contributions = ({ username, endpoint }: ContributionsProps) => {
  const { data, loading } = useContributions(endpoint)
  const contributionCalendar =
    data?.contributionsCollection?.contributionCalendar

  return (
    <Section
      title="Contributions"
      icon={<GitHub />}
      subHeading={
        <>
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
        </>
      }
      loading={loading}
    >
      {data ? (
        <div className={cn('space-y-3')}>
          <ContributionOverview data={contributionCalendar} />
          <ContributionCalendar data={contributionCalendar} />
        </div>
      ) : (
        <EmptyState message="No contributions data." />
      )}
    </Section>
  )
}

export default Contributions
