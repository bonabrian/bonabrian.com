'use client';

import { BarChart } from '@/components/shared/icons';
import useStats from '@/hooks/use-stats';
import { cn } from '@/lib/utils';
import type { EngagementStats } from '@/types/stats';

import OverviewCard from './overview-card';
import Section from './section';

const Engagements = () => {
  const { data, isLoading } = useStats<EngagementStats>('engagements');

  return (
    <Section
      title="Engagements"
      icon={<BarChart />}
      description="Discover the numbers behind views, reactions, and endorsements."
      isLoading={isLoading}
    >
      <div className={cn('mb-1 grid gap-3 py-2', 'md:grid-cols-3')}>
        <OverviewCard label="All-Time Views" value={data?.views} />
        <OverviewCard label="All-Time Reactions" value={data?.reactions} />
        <OverviewCard label="Endorsements" value={data?.endorsements} />
      </div>
    </Section>
  );
};

export default Engagements;
