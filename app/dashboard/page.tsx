import type { Metadata } from 'next';

import Container from '@/components/container';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/constants/routes';
import CodingInsights from '@/features/dashboard/components/coding-insights';
import Engagements from '@/features/dashboard/components/engagements';
import GitHubInsights from '@/features/dashboard/components/github-insights';
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
          <CodingInsights />
          <GitHubInsights />
        </div>
      </Container>
    </>
  );
};

export default DashboardPage;
