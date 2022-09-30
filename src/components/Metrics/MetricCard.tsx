import Link from '../Link'
import LoadingSpinner from '../LoadingSpinner'
import type { MetricCardProps } from './types'

export const MetricCard = ({
  link,
  text,
  value,
  icon,
  loading,
}: MetricCardProps) => {
  const IconPath = icon ?? 'svg'

  return (
    <Link href={link} showExternalLinkIcon={false}>
      <div className='flex flex-row items-center sm:flex-col sm:items-start space-x-2 sm:space-x-0 relative w-full h-full py-3 px-4 border border-gray-200 dark:border-gray-800 hover:border-primary-400 dark:hover:border-primary-600 rounded-md overflow-hidden transition-all'>
        {loading ? (
          <div className='min-h-[36px] flex items-center'>
            <LoadingSpinner />
          </div>
        ) : (
          <span className='leading-tight text-2xl sm:text-3xl'>{value}</span>
        )}
        <span className='text-sm text-ellipsis max-w-full transition-all'>
          {text}
        </span>
        {icon && (
          <IconPath className='inline-flex absolute top-3 right-3 text-2xl items-center justify-center' />
        )}
      </div>
    </Link>
  )
}
