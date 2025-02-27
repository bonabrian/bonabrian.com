import type { Metadata } from 'next';
import Image from 'next/image';

import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import { ROUTES, SITE } from '@/constants';
import { env } from '@/lib/env';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

import Biography from './biography';
import OpenForHire from './open-for-hire';

export const metadata: Metadata = seo({
  title: 'About',
  description: 'Discover insights about me, my career journey, and more.',
  keywords: ['bio', 'biography', 'information', 'about'],
  url: ROUTES.about,
});

const AboutPage = () => {
  const isAvailableForHire = env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE;

  return (
    <>
      <PageHeader title="About" description="A short story of me." />
      <Container>
        <div
          className={cn(
            'items-start space-y-2',
            'xl:grid xl:grid-cols-4 xl:space-y-0 xl:gap-x-6',
          )}
        >
          <div
            className={cn(
              'group flex flex-col items-center',
              'xl:sticky xl:top-24',
            )}
          >
            <Image
              src={SITE.author.avatar}
              alt={SITE.author.name}
              width={256}
              height={256}
              placeholder="blur"
              blurDataURL="/media/bonabrian/bonabrian-small.jpg"
              className={cn(
                'rounded-full object-cover transition-all duration-300',
                'xl:rounded-xl',
                'hover:scale-105',
              )}
              quality={100}
            />
            <div className={cn('flex flex-col items-center py-2')}>
              <h3 className={cn('font-cal text-xl')}>{SITE.author.name}</h3>
              <h4 className={cn('font-cal text-muted-foreground')}>
                Software Engineer
              </h4>
            </div>
            <OpenForHire isOpenForHire={isAvailableForHire} />
          </div>

          <div
            className={cn(
              'prose max-w-none',
              'dark:prose-dark',
              'xl:col-span-3',
            )}
          >
            <Biography />
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutPage;
