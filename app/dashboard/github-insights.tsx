'use client';

import { GitHub } from '@/components/shared/icons';
import Link from '@/components/shared/link';
import { SITE } from '@/constants';
import useStats from '@/hooks/use-stats';
import { cn } from '@/lib/utils';
import type { GitHubStats } from '@/types/stats';

import Contributions from './contributions';
import OverviewCard from './overview-card';
import Section from './section';

const GitHubInsights = () => {
  const { data, isLoading } = useStats<GitHubStats>('github');

  const contributions =
    data?.contributions.contributionsCollection.contributionCalendar;
  const totalContributions = contributions?.totalContributions ?? 0;
  const weeks = contributions?.weeks ?? [];

  const totalThisWeekContributions =
    weeks[weeks.length - 1]?.contributionDays
      .map((week) => week.contributionCount)
      .reduce((prev, curr) => prev + curr, 0) ?? 0;

  const totalContributionList = weeks.flatMap((week) =>
    week.contributionDays.map((day) => day.contributionCount),
  );

  const bestContribution = Math.max(...totalContributionList) ?? 0;
  const averageContribution = totalContributions / totalContributionList.length;

  return (
    <Section
      title="GitHub Insights"
      icon={<GitHub />}
      description="A quick look at followers, stars, and contributions activity from last year."
      appendix={
        <Link
          href={SITE.author.github.url}
          className={cn(
            'text-muted-foreground font-mono text-sm transition-colors duration-200',
            'hover:text-foreground',
          )}
        >
          @{SITE.author.github.username}
        </Link>
      }
      isLoading={isLoading}
    >
      <div className={cn('flex flex-col')}>
        <div className={cn('grid gap-3 py-2', 'md:grid-cols-2')}>
          <OverviewCard label="Stars" value={data?.stars ?? 0} />
          <OverviewCard label="Followers" value={data?.followers ?? 0} />
        </div>
        <div
          className={cn(
            'bg-rainbow-gradient-inverse relative my-3 flex flex-1 flex-col gap-2 rounded-xl p-0.5',
          )}
        >
          <div className={cn('bg-background h-full w-full rounded-xl')}>
            <p
              className={cn(
                'bg-background font-cal absolute -top-3 left-3 px-2',
              )}
            >
              Contributions
            </p>
            <div className={cn('grid gap-3 px-2 pt-4', 'md:grid-cols-4')}>
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
  );
};

export default GitHubInsights;
