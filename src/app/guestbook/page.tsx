import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { ROUTES } from '@/data/app'
import { seo } from '@/data/meta'

import Guestbook from './_components/guestbook'

export const metadata: Metadata = seo({
  title: 'Guestbook',
  description:
    'Leave suggestions, appreciation, questions, or anything else on your mind.',
  url: ROUTES.guestbook,
})

const GuestbookPage = async () => {
  return (
    <>
      <PageHeader
        title="Guestbook"
        description="Leave suggestions, appreciation, questions, or anything else on your mind."
      />
      <Container>
        <Guestbook />
      </Container>
    </>
  )
}

export default GuestbookPage
