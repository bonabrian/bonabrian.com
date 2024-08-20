import type { Metadata } from 'next';

import { CareerJourney } from '@/components/resume';
import { Container, PageHeader } from '@/components/shared';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Resume',
  description: 'Check out how my journey have been like over the years',
  keywords: ['resume', 'biography', 'cv'],
  robots: { index: false, follow: false },
  url: ROUTES.resume,
});

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
  );
};

export default ResumePage;
