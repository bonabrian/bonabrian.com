'use client'

import { useInsights } from '@/hooks'
import cn from '@/lib/cn'

import { OverviewCard, Spinner } from './common'
import { BarChart } from './icons'

const Insights = () => {
  const { data, loading } = useInsights()

  return (
    <div className={cn('flex flex-col gap-y-2')}>
      <div className={cn('flex items-center gap-1 text-xl font-medium')}>
        <BarChart />
        <h2 className={cn('capitalize')}>Insights</h2>
      </div>
      <div
        className={cn(
          'flex flex-col justify-between gap-2',
          'md:flex-row md:items-center',
        )}
      >
        <p>
          Discover key metrics, including all-time views, reactions,
          endorsements, and GitHub stars.
        </p>
      </div>
      {loading ? (
        <div className={cn('flex items-center justify-center')}>
          <Spinner />
        </div>
      ) : (
        <div className={cn('grid grid-cols-2 gap-3 my-2 md:grid-cols-4')}>
          <OverviewCard label="All-Time Views" value={data?.views ?? 0} />
          <OverviewCard
            label="All-Time Reactions"
            value={data?.reactions ?? 0}
          />
          <OverviewCard label="Endorsements" value={data?.endorsements ?? 0} />
          <OverviewCard
            label="Stars on GitHub"
            value={data?.github?.stars ?? 0}
          />
        </div>
      )}
    </div>
  )
}

export default Insights
