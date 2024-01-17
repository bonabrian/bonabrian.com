'use client'

import { GitHub } from '@/components/icons'
import { Link } from '@/components/ui'
import { GITHUB_ACCOUNT } from '@/config/github'
import type { GitHubUserContributionsCollection } from '@/types/github'
import cn from '@/utils/cn'

import Contributions from './contributions'
import OverviewCard from './overview-card'
import Section from './section'
import useStats from './use-stats'

const GitHubInsights = () => {
  const { data, loading } = useStats<{
    followers: number
    stars: number
    contributions: GitHubUserContributionsCollection | undefined
  }>('github')

  const contributions =
    data?.contributions?.contributionsCollection?.contributionCalendar

  const totalContributions = contributions?.totalContributions ?? 0
  const weeks = contributions?.weeks ?? []

  const totalThisWeekContributions =
    weeks[weeks.length - 1]?.contributionDays
      ?.map((week) => week.contributionCount)
      ?.reduce((prev, curr) => prev + curr, 0) ?? 0

  const totalContributionList = weeks.flatMap((week) =>
    week.contributionDays.map(
      (contributionDay) => contributionDay.contributionCount,
    ),
  )

  const bestContribution = Math.max(...totalContributionList) ?? 0
  const averageContribution = totalContributions / totalContributionList.length

  return (
    <Section
      title="GitHub Insights"
      icon={<GitHub className={cn('h-5 w-5')} />}
      description="A Quick Look at Followers, Stars, and Contributions Activity from last year."
      appendix={
        <Link
          href={GITHUB_ACCOUNT.url}
          passHref
          className={cn(
            'font-mono text-sm text-muted-foreground',
            'hover:text-foreground',
          )}
        >
          @{GITHUB_ACCOUNT.username}
        </Link>
      }
      loading={loading}
    >
      <div className={cn('flex flex-col')}>
        <div className={cn('grid gap-3 py-2', 'md:grid-cols-2')}>
          <OverviewCard label="Stars" value={data?.stars ?? 0} />
          <OverviewCard label="Followers" value={data?.followers ?? 0} />
        </div>
        <div
          className={cn(
            'relative my-3 flex flex-1 flex-col gap-2 rounded-xl bg-rainbow-gradient-inverse p-0.5',
          )}
        >
          <div className={cn('h-full w-full rounded-xl bg-background')}>
            <p
              className={cn(
                'absolute -top-3 left-3 bg-background px-2 font-cal',
              )}
            >
              Contributions
            </p>
            <div className={cn('grid gap-3 p-2', 'md:grid-cols-4')}>
              <OverviewCard label="Total" value={totalContributions} />
              <OverviewCard
                label="This Week"
                value={totalThisWeekContributions}
              />
              <OverviewCard label="Best Day" value={bestContribution} />
              <OverviewCard
                label="Average"
                value={averageContribution}
                unit="per day"
              />
            </div>
            <div className={cn('p-2')}>
              <Contributions data={contributions} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default GitHubInsights
