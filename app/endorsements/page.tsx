import type { Metadata } from 'next';

import Container from '@/components/container';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/constants';
import Endorsements from '@/features/endorsements/components/endorsements';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Endorsements',
  description:
    'Kindly consider supporting my technical skills and capabilities by providing an endorsement based on your firsthand experience collaborating with me.',
  url: ROUTES.endorsements,
});

export const dynamic = 'force-dynamic';

const EndorsementsPage = async () => {
  return (
    <>
      <PageHeader
        title="Endorsements"
        description="Kindly consider supporting my technical skills and capabilities by providing an endorsement based on your firsthand experience collaborating with me. Your valued endorsement is highly appreciated and will contribute significantly to showcasing my proficiency."
      />
      <Container>
        <Endorsements />
      </Container>
    </>
  );
};

export default EndorsementsPage;
