'use client';

import Link from 'next/link';

import { GitHub } from '@/components/icons';
import { SITE } from '@/constants/site';

import { useStats } from '../hooks/use-stats';
import type { GitHubStats } from '../types/stats';
import Block from './block';
import Contributions from './contributions';
import OverviewCard from './overview-card';

const GitHubInsights = () => {
  const { stats, isLoading } = useStats<GitHubStats>('github');

  const contributions =
    stats?.contributions.contributionsCollection.contributionCalendar;
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
    <Block
      title="GitHub Insights"
      icon={<GitHub />}
      description="A quick look at followers, stars, and contributions activity from last year."
      appendix={
        <Link
          href={SITE.author.github.url}
          className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors duration-200"
        >
          @{SITE.author.github.username}
        </Link>
      }
      isLoading={isLoading}
    >
      <div className="flex flex-col">
        <div className="grid gap-3 py-2 md:grid-cols-2">
          <OverviewCard label="Stars" value={stats?.stars ?? 0} />
          <OverviewCard label="Followers" value={stats?.followers ?? 0} />
        </div>
        <div className="bg-rainbow-gradient-inverse relative my-3 flex flex-1 flex-col gap-2 rounded-lg p-0.5">
          <div className="bg-background h-full w-full rounded-md">
            <p className="bg-background font-cal absolute -top-3 left-3 px-2">
              Contributions
            </p>
            <div className="grid gap-3 px-2 pt-4 md:grid-cols-4">
              <OverviewCard label="Total" value={totalContributions} />
              <OverviewCard
                label="This Week"
                value={totalThisWeekContributions}
              />
              <OverviewCard label="Best Day" value={bestContribution} />
              <OverviewCard label="Average" value={averageContribution} />
            </div>
            <div className="p-2">
              <Contributions data={contributions} />
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default GitHubInsights;
