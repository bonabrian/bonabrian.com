import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { ROUTES } from '@/data/app'
import { seo } from '@/data/meta'

import CareerJourney from './_components/career-journey'

export const metadata: Metadata = seo({
  title: 'Resume',
  description: 'Check out how my journey have been like over the years',
  keywords: ['resume', 'biography', 'cv'],
  robots: { index: false, follow: false },
  url: ROUTES.resume,
})

const ResumePage = () => {
  return (
    <>
      <PageHeader
        title="Resume"
        description="A brief overview of my professional journey and career milestones."
      />

      <div id="content">
        <CareerJourney />
      </div>
    </>
  )
}

export default ResumePage
