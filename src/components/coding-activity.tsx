'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { useEffect, useState } from 'react'

import { useWakatime } from '@/hooks'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'

import { OverviewCard, Spinner } from './common'
import Progress from './common/progress'
import { WakaTime as WakaTimeIcon } from './icons'
import Link from './link'

const CodingActivity = () => {
  const { data, loading } = useWakatime()

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

        const distanceToNow = formatDistanceToNowStrict(zonedDate, {
          addSuffix: true,
        })

        setFormattedLastModifiedDate(distanceToNow)
      }
    }

    formatLastModified()
  }, [data])

  const startDate = data?.start ? formatDate(data?.start) : 'N/A'
  const endDate = data?.end ? formatDate(data?.end) : 'N/A'
  const dailyAverage =
    data?.human_readable_daily_average_including_other_language ?? 'N/A'
  const thisWeekTotal =
    data?.human_readable_total_including_other_language ?? 'N/A'
  const bestDayDate = data?.best_day?.date
  const bestDayText = data?.best_day?.text
  const bestDay = bestDayDate
    ? `${formatDate(bestDayDate)} (${bestDayText})`
    : 'N/A'
  const allTimeSinceToday = data?.all_time_since_today?.text || 'N/A'

  const languages = data?.languages ? data.languages.slice(0, 4) : []
  const editors = data?.editors ?? []

  const activities = [
    {
      title: 'Languages',
      data: languages,
      bg: 'bg-gradient-to-r from-pink-400 via-blue-400 to-purple-600',
    },
    {
      title: 'Editors',
      data: editors,
      bg: 'bg-gradient-to-r from-purple-600 via-blue-400 to-pink-400',
    },
  ]

  return (
    <div className={cn('flex flex-col gap-y-2')}>
      <div className={cn('flex items-center gap-1 text-xl font-medium')}>
        <WakaTimeIcon />
        <h2 className={cn('capitalize')}>Weekly Coding Activities</h2>
      </div>
      <div
        className={cn(
          'flex flex-col justify-between gap-2',
          'md:flex-row md:items-center',
        )}
      >
        <div className={cn('items-center')}>
          <span>My </span>
          <Link
            href="https://wakatime.com/@bonabrian"
            target="_blank"
            passHref
            className={cn('hover:underline')}
            showExternalLinkIcon={false}
          >
            WakaTime
          </Link>
          <span> last 7 days stats.</span>
        </div>

        <div className={cn('text-sm text-muted-foreground')}>
          Last modified:{' '}
          {formattedLastModifiedDate ? (
            <span>{formattedLastModifiedDate}</span>
          ) : (
            'N/A'
          )}
        </div>
      </div>

      {loading ? (
        <div className={cn('flex items-center justify-center')}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={cn('mb-1 grid md:grid-cols-2 gap-3 py-2')}>
            <OverviewCard label="Start Date" value={startDate} />
            <OverviewCard label="End Date" value={endDate} />
            <OverviewCard label="Daily Coding Average" value={dailyAverage} />
            <OverviewCard label="This Week Coding Time" value={thisWeekTotal} />
            <OverviewCard label="Best Day Coding Time" value={bestDay} />
            <OverviewCard
              label="All Time Since Today"
              value={allTimeSinceToday}
            />
          </div>

          <div className={cn('flex flex-col mt-2 gap-4', 'sm:flex-row')}>
            {activities.map((activity) => (
              <div
                key={activity.title}
                className={cn(
                  'relative flex flex-1 flex-col gap-2 rounded-md p-0.5',
                  activity.bg,
                )}
              >
                <div className={cn('h-full w-full rounded-md bg-background')}>
                  <p
                    className={cn('absolute -top-3 left-3 px-2 bg-background')}
                  >
                    {activity.title}
                  </p>
                  <ul className={cn('flex flex-col py-3 px-4 gap-1')}>
                    {activity.data.map((item) => (
                      <li key={item.name}>
                        <Progress data={item} className={cn(activity.bg)} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CodingActivity
