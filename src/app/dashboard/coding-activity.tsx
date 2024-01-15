'use client'

import { formatDistanceToNow } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { WakaTime as WakaTimeIcon } from '@/components/icons'
import { Progress } from '@/components/ui'
import type { WakaTime } from '@/types/wakatime'
import cn from '@/utils/cn'
import { formatDate } from '@/utils/date'

import OverviewCard from './overview-card'
import Section from './section'
import useStats from './use-stats'

const CodingActivity = () => {
  const { data, loading } = useStats<WakaTime>('wakatime')

  const [formattedLastModifiedDate, setFormattedLastModifiedDate] = useState<
    string | null
  >(null)

  useEffect(() => {
    const formatLastModified = (): void => {
      const lastModifiedDate = data?.modified_at

      if (lastModifiedDate) {
        const zonedDate = utcToZonedTime(
          zonedTimeToUtc(lastModifiedDate, 'Asia/Jakarta'),
          'Asia/Jakarta',
        )

        const distanceToNow = formatDistanceToNow(zonedDate, {
          addSuffix: true,
        })

        setFormattedLastModifiedDate(distanceToNow)
      }
    }

    formatLastModified()
  }, [data])

  // const startDate = data?.start ? formatDate(data?.start) : 'N/A'
  // const endDate = data?.end ? formatDate(data?.end) : 'N/A'
  const dailyAverage =
    data?.human_readable_daily_average_including_other_language ?? 'N/A'
  const thisWeekTotal =
    data?.human_readable_total_including_other_language ?? 'N/A'
  const bestDayDate = data?.best_day?.date
  const bestDayText = data?.best_day?.text
  const bestDay = bestDayDate
    ? `${formatDate(bestDayDate)} (${bestDayText})`
    : 'N/A'
  const allTimeSinceToday = data?.all_time_since_today?.text ?? 'N/A'

  const languages = data?.languages ?? []
  const editors = data?.editors ?? []

  const activities = [
    {
      title: 'Languages',
      data: languages,
      bg: 'bg-rainbow-gradient-inverse',
    },
    {
      title: 'Editors',
      data: editors,
      bg: 'bg-rainbow-gradient',
    },
  ]

  return (
    <Section
      title="Weekly Coding Activities"
      icon={<WakaTimeIcon />}
      description="My WakaTime last 7 days stats."
      appendix={
        <Link
          href="https://wakatime.com/@bonabrian"
          target="_blank"
          rel="noopener noreferrer"
          passHref
          className={cn('text-sm text-muted-foreground', 'hover:underline')}
        >
          Last modified:{' '}
          {formattedLastModifiedDate ? (
            <span>{formattedLastModifiedDate}</span>
          ) : (
            'N/A'
          )}
        </Link>
      }
      loading={loading}
    >
      <>
        <div className={cn('mb-1 grid gap-3 py-2', 'md:grid-cols-2')}>
          {/* <OverviewCard label="Start Date" value={startDate} />
          <OverviewCard label="End Date" value={endDate} /> */}
          <OverviewCard label="Daily Coding Average" value={dailyAverage} />
          <OverviewCard label="This Week Coding Time" value={thisWeekTotal} />
          <OverviewCard label="Best Day Coding Time" value={bestDay} />
          <OverviewCard
            label="All Time Since Today"
            value={allTimeSinceToday}
          />
        </div>

        <div className={cn('mt-2 flex flex-col gap-4', 'sm:flex-row')}>
          {activities.map((activity) => (
            <div
              key={activity.title}
              className={cn(
                'relative flex flex-1 flex-col gap-2 rounded-xl p-0.5',
                activity.bg,
              )}
            >
              <div className={cn('h-full w-full rounded-xl bg-background')}>
                <p
                  className={cn(
                    'absolute -top-3 left-3 bg-background px-2 font-cal',
                  )}
                >
                  {activity.title}
                </p>
                <ul className={cn('flex flex-col gap-1 px-4 py-3')}>
                  {activity.data.map((item) => (
                    <li key={item.name}>
                      <Progress
                        data={item}
                        className={cn(
                          'bg-gradient-to-r from-pink-400 via-blue-500 to-purple-600',
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </>
    </Section>
  )
}

export default CodingActivity
