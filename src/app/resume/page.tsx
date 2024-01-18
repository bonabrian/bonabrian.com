import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { seo } from '@/lib/meta'

import CareerJourney from './career-journey'

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
      <Container>
        <CareerJourney />
      </Container>
    </>
  )
}

export default ResumePage
