import type { Metadata } from 'next'

import { getEndorsements } from '@/actions/endorsements'
import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { seo } from '@/lib/meta'

import Endorsements from './endorsements'

export const metadata: Metadata = seo({
  title: 'Endorsements',
  description:
    'Kindly consider supporting my technical skills and capabilities by providing an endorsement based on your firsthand experience collaborating with me.',
  url: ROUTES.endorsements,
})

const EndorsementsPage = async () => {
  const fallbackData = await getEndorsements()

  return (
    <>
      <PageHeader
        title="Endorsements"
        description="Kindly consider supporting my technical skills and capabilities by providing an endorsement based on your firsthand experience collaborating with me. Your valued endorsement is highly appreciated and will contribute significantly to showcasing my proficiency."
      />
      <Container>
        <Endorsements fallbackData={fallbackData} />
      </Container>
    </>
  )
}

export default EndorsementsPage
