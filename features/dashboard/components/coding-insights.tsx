'use client';

import { formatDistanceToNow } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Progress from '@/components/progress';
import { WakaTime } from '@/components/shared/icons';
import { cn, formatDate } from '@/lib/utils';

import { useStats } from '../hooks/use-stats';
import type { CodingActivityStats } from '../types/stats';
import type { WakaTimeSummary } from '../types/wakatime';
import Block from './block';
import OverviewCard from './overview-card';

const CodingInsights = () => {
  const { stats, isLoading } = useStats<CodingActivityStats>('wakatime');
  const [formattedLastModifiedDate, setFormattedLastModifiedDate] = useState<
    string | null
  >(null);

  useEffect(() => {
    const formatLastModified = (): void => {
      const lastModifiedDate = stats?.modified_at;

      if (lastModifiedDate) {
        const zonedDate = toZonedTime(
          fromZonedTime(lastModifiedDate, 'Asia/Jakarta'),
          'Asia/Jakarta',
        );

        const distanceToNow = formatDistanceToNow(zonedDate, {
          addSuffix: true,
        });

        setFormattedLastModifiedDate(distanceToNow);
      }
    };

    formatLastModified();
  }, [stats]);

  // TODO: will fix later
  // const startDate = data?.start ? formatDate(data?.start) : 'N/A';
  // const endDate = data?.end ? formatDate(data?.end) : 'N/A';
  const dailyAverage =
    stats?.human_readable_daily_average_including_other_language ?? 'N/A';
  const thisWeekTotal =
    stats?.human_readable_total_including_other_language ?? 'N/A';
  const bestDayDate = stats?.best_day?.date;
  const bestDayText = stats?.best_day?.text;
  const bestDay = bestDayDate
    ? `${formatDate(bestDayDate)} (${bestDayText})`
    : 'N/A';
  const allTimeSinceToday = stats?.all_time_since_today?.text ?? 'N/A';

  const languages = stats?.languages ?? [];
  const editors = stats?.editors ?? [];

  const activities: Array<{
    title: string;
    data: WakaTimeSummary[];
    className: string;
  }> = [
    {
      title: 'Languages',
      data: languages,
      className: 'bg-rainbow-gradient-inverse',
    },
    {
      title: 'Editors',
      data: editors,
      className: 'bg-rainbow-gradient',
    },
  ];

  return (
    <Block
      title="Weekly Coding Activities"
      icon={<WakaTime />}
      description="My WakaTime last 7 days stats."
      isLoading={isLoading}
      appendix={
        <Link
          href="https://wakatime.com/@bonabrian"
          className="text-muted-foreground hover:text-foreground text-sm transition-all duration-200 hover:underline"
        >
          Last modified{' '}
          {formattedLastModifiedDate ? (
            <span>{formattedLastModifiedDate}</span>
          ) : (
            'N/A'
          )}
        </Link>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-3 py-2 md:grid-cols-2">
          {/* <OverviewCard label="Start Date" value={startDate} /> */}
          {/* <OverviewCard label="End Date" value={endDate} /> */}
          <OverviewCard label="Daily Coding Average" value={dailyAverage} />
          <OverviewCard label="This Week's Coding Time" value={thisWeekTotal} />
          <OverviewCard label="Best Day Coding Time" value={bestDay} />
          <OverviewCard label="Total Coding Time" value={allTimeSinceToday} />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className={cn(
                'relative flex flex-1 flex-col gap-2 rounded-lg p-0.5',
                activity.className,
              )}
            >
              <div className="bg-background size-full rounded-md">
                <p className="bg-background font-cal absolute -top-3 left-3 px-2">
                  {activity.title}
                </p>
                <ul className="flex flex-col gap-1 px-4 py-3">
                  {activity.data.map((item) => (
                    <li key={item.name}>
                      <Progress
                        data={item}
                        className="to-primary bg-gradient-to-r from-pink-400 via-purple-400"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
};

export default CodingInsights;
