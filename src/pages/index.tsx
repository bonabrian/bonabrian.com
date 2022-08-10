import type { NextPage } from 'next'

import { PageMeta } from '@/components/Meta'

const Home: NextPage = () => {
  return (
    <>
      <PageMeta title='Home' />
      <div className='flex flex-col justify-around w-full h-content sm:h-content-sm'>
        <div className='flex flex-col'>
          <h1 className='my-5 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Hi, I&apos;m{' '}
            <span className='text-primary-500 dark:text-primary-500'>
              Bona Brian Siagian
            </span>
            <span className='block'>Full Stack Developer</span>
          </h1>
          <div className='text-base sm:text-xl'>
            <p>
              I&apos;m from{' '}
              <span className='font-semibold'>Jakarta, Indonesia</span>.
            </p>
            <p>
              I like to build interactive things with code. I also talk and
              write about those things.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
