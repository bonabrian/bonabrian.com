import type { NextPage } from 'next'

import DiscoverMore from '@/components/DiscoverMore'
import PageSeo from '@/components/PageSeo'

const Home: NextPage = () => {
  return (
    <>
      <PageSeo
        keywords={[
          'bona',
          'bonabrian',
          'bonabriansiagian',
          'Bona Brian Siagian',
          'full-stack',
          'back-end',
          'front-end',
          'portfolio',
          'developer',
          'development',
        ]}
      />
      <div className='flex flex-col justify-evenly items-center w-full h-content sm:h-content-sm'>
        <div className='flex flex-col'>
          <h1 className='my-5 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Hi, I&apos;m{' '}
            <span className='text-primary-500 dark:text-primary-500'>
              Bona Brian Siagian
            </span>
            <span className='block'>Full Stack Developer</span>
          </h1>
          <div className='text-base sm:text-xl' data-nosnippet>
            <p>
              I like to build interactive things with code. I also talk and
              write about those things.
            </p>
          </div>
        </div>
        <DiscoverMore label='know more about me' href='/about' />
      </div>
    </>
  )
}

export default Home
