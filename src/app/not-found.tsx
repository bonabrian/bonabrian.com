import { Link } from '@/components/ui'
import cn from '@/lib/cn'

import FourZeroFourImage from '../../assets/images/404.svg'

const FourZeroFour = () => {
  return (
    <>
      <title>Page Not Found</title>
      <div className={cn('my-4 flex flex-col items-center justify-center')}>
        <div className={cn('py-4')}>
          <FourZeroFourImage className={cn('w-full fill-current')} />
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
            'mb-4 text-center text-lg leading-normal text-gray-500',
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
            'inline rounded-lg border border-transparent px-4 py-2 font-medium text-white shadow',
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
