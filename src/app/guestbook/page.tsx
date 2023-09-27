import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { getMetadata } from '@/lib/metadata'

import Guestbook from './_components/guestbook'

export const metadata: Metadata = getMetadata({
  title: 'Guestbook',
  description: 'Something describe this page',
})

const GuestbookPage = () => {
  return (
    <>
      <PageHeader
        title="Guestbook"
        description="Something describe this page"
      />
      <Container>
        <Guestbook />
      </Container>
    </>
  )
}

export default GuestbookPage
