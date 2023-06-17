import cx from 'classnames'

import IncrementCounter from '../increment-counter'
import Link from '../link'
import Spinner from '../spinner'

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
      className={cx(
        'flex flex-row items-center relative p-4 border-2 rounded-2xl border-slate-100 hover:border-primary-600',
        'sm:flex-col sm:items-start',
        'dark:border-gray-800 dark:hover:border-primary-400',
      )}
    >
      {link ? (
        <Link href={link} showExternalLinkIcon={false} className={cx('w-full')}>
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
      <div className={cx('flex justify-between w-full')}>
        <div className={cx('flex flex-col')}>
          {loading ? (
            <div className={cx('flex items-center h-8')}>
              <Spinner />
            </div>
          ) : (
            <div
              className={cx(
                'h-8 font-semibold text-2xl text-gray-700',
                'dark:text-slate-50',
              )}
            >
              <IncrementCounter to={value} />
            </div>
          )}
          <div
            className={cx(
              'text-sm text-ellipsis text-gray-600',
              'dark:text-slate-200',
            )}
          >
            {text}
          </div>
        </div>
        <div
          className={cx(
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
