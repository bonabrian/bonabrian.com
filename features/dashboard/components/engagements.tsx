'use client';

import { ChartNoAxesColumnIcon } from 'lucide-react';

import { useStats } from '../hooks/use-stats';
import type { EngagementStats } from '../types/stats';
import Block from './block';
import OverviewCard from './overview-card';

const Engagements = () => {
  const { stats, isLoading } = useStats<EngagementStats>('engagements');

  return (
    <Block
      title="Engagements"
      description="Discover the numbers behind views, reactions, and endorsements."
      icon={<ChartNoAxesColumnIcon />}
      isLoading={isLoading}
    >
      <div className="mb-1 grid gap-3 py-2 md:grid-cols-3">
        <OverviewCard label="All-Time views" value={stats?.views} />
        <OverviewCard label="All-Time reactions" value={stats?.reactions} />
        <OverviewCard label="Endorsements" value={stats?.endorsements} />
      </div>
    </Block>
  );
};

export default Engagements;
