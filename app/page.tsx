import type { Metadata } from 'next';

import Container from '@/components/shared/container';
import { SITE } from '@/constants';
import GetInTouch from '@/features/home/components/get-in-touch';
import Hero from '@/features/home/components/hero';
import HighlightedProjects from '@/features/home/components/highlighted-projects';
import LatestPosts from '@/features/home/components/latest-posts';
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
      <Container className={cn('gap-8')}>
        <HighlightedProjects />
        <LatestPosts />
        <GetInTouch />
      </Container>
    </div>
  );
};

export default HomePage;
