'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import type { ContributionCalendar } from '../types/github';

const Contributions = ({ data }: { data?: ContributionCalendar }) => {
  const [selectedContribution, setSelectedContribution] = useState<{
    count: number | null;
    date: string | null;
  }>({
    count: null,
    date: null,
  });

  const weeks = data?.weeks ?? [];
  const months =
    data?.months.map((month) => {
      const filterContributionDay = weeks
        .filter((week) => week.firstDay.startsWith(month.firstDay.slice(0, 7)))
        .map((week) => week.contributionDays)
        .flat(1);

      const getContributionsByMonth = filterContributionDay.reduce(
        (prev, curr) => prev + curr.contributionCount,
        0,
      );

      return {
        ...month,
        contributionsCount: getContributionsByMonth,
      };
    }) ?? [];

  const contributionColors = data?.colors ?? [];

  return (
    <div className="bg-card rounded-lg p-3">
      <div className="relative mb-4 flex flex-col justify-center overflow-hidden">
        <div className="flex flex-col overflow-x-auto">
          <ul className="flex justify-start gap-1 text-xs">
            {months.map((month) => (
              <li
                key={month.firstDay}
                className={cn(month.totalWeeks < 2 && 'invisible')}
                style={{ minWidth: 16.755 * month.totalWeeks }}
              >
                {month.name}
              </li>
            ))}
          </ul>

          <div className="flex justify-start gap-[3px]">
            {weeks.map((week) => (
              <div key={week.firstDay}>
                {week.contributionDays.map((contribution) => {
                  const backgroundColor =
                    contribution.contributionCount > 0 && contribution.color;
                  const getRandomDelayAnimate =
                    Math.random() * week.contributionDays.length * 0.15;

                  return (
                    <motion.span
                      key={contribution.date}
                      initial="initial"
                      animate="animate"
                      variants={{
                        initial: { opacity: 0, translateY: -20 },
                        animate: {
                          opacity: 1,
                          translateY: 0,
                          transition: { delay: getRandomDelayAnimate },
                        },
                      }}
                      className="bg-muted my-0.5 block size-[14.85px] rounded-sm"
                      style={backgroundColor ? { backgroundColor } : undefined}
                      onMouseEnter={() =>
                        setSelectedContribution({
                          count: contribution.contributionCount,
                          date: contribution.date,
                        })
                      }
                      onMouseLeave={() =>
                        setSelectedContribution({ count: null, date: null })
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Less</span>
          <ul className="flex gap-1">
            <motion.li className="bg-muted size-3 rounded-sm" />
            {contributionColors.map((color, index) => (
              <motion.li
                key={color}
                initial="initial"
                animate="animate"
                variants={{
                  initial: { opacity: 0 },
                  animate: {
                    opacity: 1,
                    transition: { delay: index * 0.3 },
                  },
                }}
                className="size-3 rounded-sm"
                style={{ backgroundColor: color }}
              ></motion.li>
            ))}
          </ul>
          <span>More</span>
        </div>
        <div
          className={cn(
            selectedContribution?.date ? 'opacity-100' : 'opacity-0',
            'font-cal rounded-sm p-1.5 text-xs',
          )}
        >
          {selectedContribution?.count} contributions on{' '}
          {selectedContribution?.date}
        </div>
      </div>
    </div>
  );
};

export default Contributions;
