'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { useEffect, useState } from 'react'

import { WakaTime as WakaTimeIcon } from '@/components/icons'
import { Link, Progress } from '@/components/ui'
import cn from '@/lib/cn'
import { formatDate } from '@/lib/utils'

import useWakatime from '../_hooks/use-wakatime'
import OverviewCard from './overview-card'
import Section from './section'

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
  const allTimeSinceToday = data?.all_time_since_today?.text ?? 'N/A'

  const languages = data?.languages ?? []
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
    <Section
      title="Weekly Coding Activities"
      icon={<WakaTimeIcon />}
      subHeading={
        <>
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
        </>
      }
      loading={loading}
    >
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
                <p className={cn('absolute -top-3 left-3 px-2 bg-background')}>
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
    </Section>
  )
}

export default CodingActivity
