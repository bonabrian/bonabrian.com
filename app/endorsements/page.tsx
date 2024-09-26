import type { Metadata } from 'next';

import { getEndorsements } from '@/actions/endorsements';
import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';

import Endorsements from './endorsements';

export const metadata: Metadata = seo({
  title: 'Endorsements',
  description:
    'Kindly consider supporting my technical skills and capabilities by providing an endorsement based on your firsthand experience collaborating with me.',
  url: ROUTES.endorsements,
});

const EndorsementsPage = async () => {
  const endorsements = await getEndorsements();

  return (
    <>
      <PageHeader
        title="Endorsements"
        description="Kindly consider supporting my technical skills and capabilities by providing an endorsement based on your firsthand experience collaborating with me. Your valued endorsement is highly appreciated and will contribute significantly to showcasing my proficiency."
      />
      <Container>
        <Endorsements fallbackData={endorsements} />
      </Container>
    </>
  );
};

export default EndorsementsPage;
