import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'
import { ROUTES } from '@/config/links'
import { seo } from '@/lib/meta'

import Guestbook from './guestbook'

export const metadata: Metadata = seo({
  title: 'Guestbook',
  description:
    'Feel free to share your suggestions, appreciation, questions, or anything else on your mind.',
  url: ROUTES.guestbook,
})

const GuestbookPage = () => {
  return (
    <>
      <PageHeader
        title="Guestbook"
        description="Feel free to share your suggestions, appreciation, questions, or anything else on your mind."
      />
      <Container>
        <Guestbook />
      </Container>
    </>
  )
}

export default GuestbookPage
