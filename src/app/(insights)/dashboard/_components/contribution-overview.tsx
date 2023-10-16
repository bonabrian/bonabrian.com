import type { ContributionCalendar } from '@/data/app'
import cn from '@/lib/cn'

import OverviewCard from './overview-card'

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
    <div className={cn('my-2 grid grid-cols-2 gap-3 md:grid-cols-4')}>
      <OverviewCard label="Total" value={totalContributions} />
      <OverviewCard label="This Week" value={totalThisWeekContributions} />
      <OverviewCard label="Best Day" value={bestContribution} />
      <OverviewCard
        label="Average"
        value={averageContribution}
        unit="per day"
      />
    </div>
  )
}

export default ContributionOverview
