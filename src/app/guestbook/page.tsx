import PageHeader from '@/components/page-header'
import { Container } from '@/components/ui'

const GuestbookPage = () => {
  return (
    <>
      <PageHeader
        title="Guestbook"
        description="Leave suggestions, appreciation, questions, or anything else on your mind."
      />
      <Container>
        <div>Guestbook</div>
      </Container>
    </>
  )
}

export default GuestbookPage
