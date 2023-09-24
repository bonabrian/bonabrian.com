import { Link } from '@/components/ui'
import cn from '@/lib/cn'

import FourZeroFourImage from '../../assets/images/404.svg'

const FourZeroFour = () => {
  return (
    <>
      <title>Page Not Found</title>
      <div className={cn('flex flex-col items-center justify-center my-4')}>
        <div className={cn('py-4')}>
          <FourZeroFourImage className={cn('fill-current w-full')} />
          <h1
            className={cn(
              'mb-4 mt-10 text-center text-6xl font-extrabold leading-9 tracking-tight',
            )}
          >
            404
          </h1>
        </div>
        <p
          className={cn(
            'text-lg leading-normal text-center text-gray-500 mb-4',
            'dark:text-gray-400',
          )}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Unfortunately, the page you're looking for doesn't exist or has been
          moved. But dont worry, you can find plenty of other things on our
          homepage.
        </p>
        <Link
          href="/"
          className={cn(
            'inline text-white px-4 py-2 font-medium border border-transparent rounded-lg shadow',
            '',
          )}
        >
          Go back home
        </Link>
      </div>
    </>
  )
}

export default FourZeroFour
