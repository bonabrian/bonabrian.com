import Link from '@/components/Link'
import PageSeo from '@/components/PageSeo'

import FourZeroFourImage from '../../public/static/404.svg'

const FourZeroFour = () => {
  return (
    <>
      <PageSeo
        title="Page Not Found"
        description="The page you're looking for doesn't exists or has been moved."
        keywords={['404', 'not found', 'page not found']}
      />
      <div className="flex flex-col items-center justify-center my-4">
        <div className="py-4">
          <FourZeroFourImage className="fill-current w-full" />
          <h1 className="mb-4 mt-10 text-center text-6xl font-extrabold leading-9 tracking-tight">
            404
          </h1>
        </div>
        <p className="text-lg leading-normal text-center text-gray-500 dark:text-gray-400 mb-4">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Unfortunately, the page you're looking for doesn't exist or has been
          moved. But dont worry, you can find plenty of other things on our
          homepage.
        </p>
        <Link
          href="/"
          className="inline text-white px-4 py-2 font-medium bg-primary-400 dark:bg-primary-600 border border-transparent rounded-lg shadow hover:bg-primary-500 dark:hover:bg-primary-700"
        >
          Go back home
        </Link>
      </div>
    </>
  )
}

export default FourZeroFour
