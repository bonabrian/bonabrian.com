import type { Metadata } from 'next';

import Container from '@/components/shared/container';
import { SITE } from '@/constants';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

import GetInTouch from './get-in-touch';
import Hero from './hero';
import HighlightedProjects from './highlighted-projects';
import LatestPosts from './latest-posts';

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
