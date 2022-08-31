import Link from '../Link'
import type { DiscoverMoreProps } from './types'

const DiscoverMore = ({ label, href }: DiscoverMoreProps) => {
  return (
    <Link href={href}>
      <div className='flex justify-center items-center cursor-pointer relative h-16 w-60 group'>
        <div className='w-16 h-16 bg-gray-200 dark:bg-gray-800 absolute rounded-full top-1/2 -translate-y-1/2 ml-0 transition-all duration-300 animate-pulse left-0 group-hover:left-3/4 group-hover:scale-105' />
        <div className='absolute transition-all top-1/2 -translate-y-1/2 text-base sm:text-lg tracking-wide font-medium'>
          {label}
        </div>
      </div>
    </Link>
  )
}

export default DiscoverMore
