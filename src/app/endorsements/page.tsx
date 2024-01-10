import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { ROUTES } from '@/data/app'
import { seo } from '@/data/meta'

import Endorsements from './_components/endorsements'
import { getEndorsements } from './actions/endorsements'

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

      <div id="content">
        <Endorsements fallbackData={fallbackData} />
      </div>
    </>
  )
}

export default EndorsementsPage
