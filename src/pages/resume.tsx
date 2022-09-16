import { RiFileTextLine } from 'react-icons/ri'

import Experiences from '@/components/Experiences'
import Link from '@/components/Link'
import PageSeo from '@/components/PageSeo'
import PageTitle from '@/components/PageTitle'

const Resume = () => {
  return (
    <>
      <PageSeo
        title='Resume'
        description='Check out how my journey have been like over the years'
        keywords={['resume', 'biography', 'cv']}
      />
      <div className='pt-6 pb-8 space-y-2 md:space-y-5 flex justify-between items-center'>
        <PageTitle>Resume</PageTitle>
        <Link
          href='/cv'
          className='flex items-center border-dotted border-b-2 mt-0 sm:text-lg'
        >
          <RiFileTextLine className='mr-1' /> Download Resume
        </Link>
      </div>
      <div className='py-8 px-4 prose dark:prose-dark max-w-none xl:col-span-2'>
        <Experiences />
      </div>
    </>
  )
}

export default Resume
