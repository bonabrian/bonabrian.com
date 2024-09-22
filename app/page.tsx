import type { Metadata } from 'next';

import Hero from '@/components/home/hero';
import HighlightedProjects from '@/components/home/highlighted-projects';
import LatestPosts from '@/components/home/latest-posts';
import Container from '@/components/shared/container';
import { SITE } from '@/constants';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

export const metadata: Metadata = seo({
  title: SITE.title,
  url: '/',
});

const HomePage = () => {
  return (
    <div className={cn('flex flex-col')}>
      <Hero />
      <Container className={cn('gap-12')}>
        <HighlightedProjects />
        <LatestPosts />
      </Container>
    </div>
  );
};

export default HomePage;
