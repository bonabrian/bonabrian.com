import { RiArrowRightSLine } from 'react-icons/ri'

import { routes } from '@/data'

import CallToAction from './call-to-action'

const Introduction = () => {
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-content">
      <div className="flex flex-col">
        <h1 className="my-3 sm:my-5 text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-10 md:leading-12 lg:leading-14">
          Hi, I'm{' '}
          <span className="text-primary-500 drop-shadow-[4px_4px_rgb(255_87_187_/_20%)] dark:drop-shadow-[4px_4px_rgb(245_100_169_/_60%)]">
            Bona Brian Siagian
          </span>
          <span className="block sm:mt-2">Fullstack Engineer</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl">
          I like to build interactive things with code. I also talk and write
          about those things.
        </p>
      </div>
      <CallToAction href={routes.ABOUT}>
        Discover More <RiArrowRightSLine className="ml-1" />
      </CallToAction>
    </div>
  )
}

export default Introduction
