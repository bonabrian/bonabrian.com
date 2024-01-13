'use client'

import { m } from 'framer-motion'
import { useState } from 'react'

import type { ContributionCalendar } from '@/types/github'
import cn from '@/utils/cn'

interface ContributionsProps {
  data?: ContributionCalendar
}

const Contributions = ({ data }: ContributionsProps) => {
  const [selectedContribution, setSelectedContribution] = useState<{
    count: number | null
    date: string | null
  }>({ count: null, date: null })

  const weeks = data?.weeks ?? []
  const months =
    data?.months?.map((month) => {
      const filterContributionDay = weeks
        .filter((week) => week.firstDay.startsWith(month.firstDay.slice(0, 7)))
        .map((item) => item.contributionDays)
        .flat(1)

      const getContributionsByMonth = filterContributionDay.reduce(
        (prev, current) => prev + current.contributionCount,
        0,
      )

      return {
        ...month,
        contributionsCount: getContributionsByMonth,
      }
    }) ?? []

  const contributionColors = data?.colors ?? []

  return (
    <div className={cn('rounded-md bg-card p-3')}>
      <div
        className={cn(
          'relative mb-4 flex flex-col justify-center overflow-hidden',
        )}
      >
        <div className={cn('flex flex-col overflow-x-auto')}>
          <ul className={cn('flex justify-start gap-1 text-xs')}>
            {months.map((month) => (
              <li
                key={month.firstDay}
                className={cn(month.totalWeeks < 2 && 'invisible')}
                style={{ minWidth: 16.325 * month.totalWeeks }}
              >
                {month.name}
              </li>
            ))}
          </ul>

          <div className={cn('flex justify-start gap-[3px]')}>
            {weeks?.map((week) => (
              <div key={week.firstDay}>
                {week.contributionDays.map((contribution) => {
                  const backgroundColor =
                    contribution.contributionCount > 0 && contribution.color
                  const getRandomDelayAnimate =
                    Math.random() * week.contributionDays.length * 0.15

                  return (
                    <m.span
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
                      className={cn(
                        'my-[2px] block h-[14.3px] w-[14.3px] rounded-sm bg-muted',
                      )}
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
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cn('flex flex-wrap items-center justify-between gap-2')}>
        <div className={cn('flex items-center gap-2 text-xs')}>
          <span className={cn('text-muted-foreground')}>Less</span>
          <ul className={cn('flex gap-1')}>
            <m.li className={cn('h-3 w-3 rounded-sm bg-muted')} />
            {contributionColors.map((color, index) => (
              <m.li
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
                className={cn('h-3 w-3 rounded-sm')}
                style={{ backgroundColor: color }}
              />
            ))}
          </ul>
          <span>More</span>
        </div>
        <div
          className={cn(
            selectedContribution?.date ? 'opacity-100' : 'opacity-0',
            'rounded bg-card p-1.5 font-cal text-xs text-card-foreground',
          )}
        >
          {selectedContribution?.count} contributions on{' '}
          {selectedContribution?.date}
        </div>
      </div>
    </div>
  )
}

export default Contributions
