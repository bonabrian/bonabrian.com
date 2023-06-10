import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import Resume from '@/components/resume'
import { getMetadata } from '@/lib/metadata'

export const metadata: Metadata = getMetadata({
  title: 'Resume',
  description: 'Check out how my journey have been like over the years',
  keywords: ['resume', 'biography', 'cv'],
  robots: { index: false, follow: false },
})

const ResumePage = () => {
  return (
    <>
      <PageHeader
        title="Resume"
        description="A brief overview of my professional journey and career milestones."
      />

      <div id="content">
        <Resume />
      </div>
    </>
  )
}

export default ResumePage
