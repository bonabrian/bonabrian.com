import type { Metadata } from 'next';

import Container from '@/components/container';
import { SITE } from '@/constants';
import GetInTouch from '@/features/home/components/get-in-touch';
import Hero from '@/features/home/components/hero';
import LatestPosts from '@/features/posts/components/latest-posts';
import HighlightedProjects from '@/features/projects/components/highlighted-projects';
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
