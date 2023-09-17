import cn from '@/lib/cn'
import type { ContributionCalendar } from '@/types/github'

import { IncrementCounter } from './ui'

interface OverviewItemProps {
  label: string
  value: number
  unit?: string
}
const OverviewItem = ({ label, value, unit = '' }: OverviewItemProps) => {
  return (
    <div
      className={cn('flex flex-col self-center rounded-md bg-card py-3 px-4')}
    >
      <span className={cn('text-sm text-card-foreground')}>
        {label}
        {unit && <span className={cn('text-sm')}> ({unit})</span>}
      </span>
      <div className={cn('flex  items-end')}>
        <div className={cn('text-xl font-medium', 'lg:text-2xl')}>
          <IncrementCounter to={value} />
        </div>
      </div>
    </div>
  )
}

interface ContributionOverviewProps {
  data?: ContributionCalendar
}

const ContributionOverview = ({ data }: ContributionOverviewProps) => {
  const totalContributions = data?.totalContributions ?? 0
  const weeks = data?.weeks ?? []

  const totalThisWeekContributions =
    weeks[weeks.length - 1]?.contributionDays
      ?.map((week) => week.contributionCount)
      ?.reduce((prev, current) => prev + current, 0) ?? 0

  const totalContributionList = weeks
    .map((week) =>
      week.contributionDays.map(
        (contributionDay) => contributionDay.contributionCount,
      ),
    )
    .flat()

  const bestContribution = Math.max(...totalContributionList) || 0
  const averageContribution = totalContributions / totalContributionList.length

  return (
    <div className={cn('grid grid-cols-2 gap-3 my-2 md:grid-cols-4')}>
      <OverviewItem label="Total" value={totalContributions} />
      <OverviewItem label="This Week" value={totalThisWeekContributions} />
      <OverviewItem label="Best Day" value={bestContribution} />
      <OverviewItem
        label="Average"
        value={averageContribution}
        unit="per day"
      />
    </div>
  )
}

export default ContributionOverview
