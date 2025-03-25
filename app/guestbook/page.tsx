import type { Metadata } from 'next';

import Container from '@/components/container';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/constants';
import Guestbook from '@/features/guestbook/components/guestbook';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Guestbook',
  description:
    'Feel free to share your suggestions, appreciation, questions, or anything else on your mind.',
  url: ROUTES.guestbook,
});

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
  );
};

export default GuestbookPage;
