import type { Metadata } from 'next';

import {
  CodingActivity,
  Engagements,
  GitHubInsights,
} from '@/components/dashboard';
import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';

export const metadata: Metadata = seo({
  title: 'Dashboard',
  description:
    'Discover a comprehensive overview of digital presence, encompassing coding insights, key metrics, and more, all conveniently in one place.',
  keywords: ['statistics', 'stats', 'dashboard', 'github'],
  url: ROUTES.dashboard,
});

const DashboardPage = () => {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Discover a comprehensive overview of digital presence, encompassing coding insights, key metrics, and more, all conveniently in one place."
      />
      <Container>
        <div className="flex flex-col gap-8">
          <Engagements />
          <CodingActivity />
          <GitHubInsights />
        </div>
      </Container>
    </>
  );
};

export default DashboardPage;