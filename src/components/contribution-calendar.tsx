'use client'

import { m } from 'framer-motion'
import { useState } from 'react'

import cn from '@/lib/cn'
import { ContributionCalendar } from '@/types/github'

interface ContributionCalendarProps {
  data?: ContributionCalendar
}

const ContributionCalendar = ({ data }: ContributionCalendarProps) => {
  const [selectContribution, setSelectContribution] = useState<{
    count: number | null
    date: string | null
  }>({
    count: null,
    date: null,
  })

  const weeks = data?.weeks ?? []
  const months =
    data?.months?.map((month) => {
      const filterContributionDay = weeks
        .filter(
          (week) => week.firstDay.slice(0, 7) === month.firstDay.slice(0, 7),
        )
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
    <div className={cn('border p-4 rounded-md', 'dark:border-neutral-800')}>
      <div
        className={cn(
          'relative flex flex-col overflow-hidden overflow-x-auto mb-4',
        )}
      >
        <div
          className={cn('relative flex flex-col items-center justify-center')}
        >
          <ul className={cn('flex justify-end gap-1 text-xs md:justify-start')}>
            {months.map((month) => (
              <li
                key={month.firstDay}
                className={cn(month.totalWeeks < 2 && 'invisible')}
                style={{ minWidth: 19.05 * month.totalWeeks }}
              >
                {month.name}
              </li>
            ))}
          </ul>

          <div className={cn('flex justify-start gap-1')}>
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
                        'my-[2px] block h-4 w-4 rounded-sm bg-muted',
                      )}
                      style={backgroundColor ? { backgroundColor } : undefined}
                      onMouseEnter={() =>
                        setSelectContribution({
                          count: contribution.contributionCount,
                          date: contribution.date,
                        })
                      }
                      onMouseLeave={() =>
                        setSelectContribution({ count: null, date: null })
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
            <m.li className={cn('w-3 h-3 rounded-sm bg-muted')} />
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
                className={cn('w-3 h-3 rounded-sm')}
                style={{ backgroundColor: color }}
              />
            ))}
          </ul>
          <span>More</span>
        </div>
        <div
          className={cn(
            selectContribution?.date ? 'opacity-100' : 'opacity-0',
            'rounded bg-card text-card-foreground p-1.5 text-xs',
          )}
        >
          {selectContribution?.count} contributions on{' '}
          {selectContribution?.date}
        </div>
      </div>
    </div>
  )
}

export default ContributionCalendar
