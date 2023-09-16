import cn from '@/lib/cn'

import IncrementCounter from '../increment-counter'
import Link from '../link'
import { Spinner } from '../ui'

interface StatisticsCardProps {
  link?: string
  text: string
  value: number
  icon?: JSX.Element
  loading?: boolean
}

const Box = ({
  link,
  children,
}: {
  link?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center relative p-4 border-2 rounded-2xl border-slate-100',
        'sm:flex-col sm:items-start',
        'dark:border-gray-800',
      )}
    >
      {link ? (
        <Link href={link} showExternalLinkIcon={false} className={cn('w-full')}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

const StatisticsCard = ({
  link,
  text,
  value,
  icon,
  loading,
}: StatisticsCardProps) => {
  return (
    <Box link={link}>
      <div className={cn('flex justify-between w-full')}>
        <div className={cn('flex flex-col')}>
          {loading ? (
            <div className={cn('flex items-center h-8')}>
              <Spinner />
            </div>
          ) : (
            <div
              className={cn(
                'h-8 font-semibold text-2xl text-gray-700',
                'dark:text-slate-50',
              )}
            >
              <IncrementCounter to={value} />
            </div>
          )}
          <div
            className={cn(
              'text-sm text-ellipsis text-gray-600',
              'dark:text-slate-200',
            )}
          >
            {text}
          </div>
        </div>
        <div
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full bg-slate-100',
            'dark:bg-gray-800',
          )}
        >
          {icon}
        </div>
      </div>
    </Box>
  )
}

export default StatisticsCard
