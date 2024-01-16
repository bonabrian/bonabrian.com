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
    'Please consider endorsing my technical skills and abilities based on your personal experience working with me. Your endorsement will be greatly appreciated.',
  url: ROUTES.endorsements,
})

const EndorsementsPage = async () => {
  const fallbackData = await getEndorsements()

  return (
    <>
      <PageHeader
        title="Endorsements"
        description="Please consider endorsing my technical skills and abilities based on your personal experience working with me. Your endorsement will be greatly appreciated."
      />
      <Container>
        <Endorsements fallbackData={fallbackData} />
      </Container>
    </>
  )
}

export default EndorsementsPage
