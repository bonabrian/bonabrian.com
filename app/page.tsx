import type { Metadata } from 'next';

import { Hero } from '@/components/home';
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
    </div>
  );
};

export default HomePage;
