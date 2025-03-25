import type { Metadata } from 'next';
import Image from 'next/image';

import Container from '@/components/container';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import env from '@/env';
import Biography from '@/features/about/components/biography';
import OpenForHire from '@/features/about/components/open-for-hire';
import { seo } from '@/lib/meta';

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
        <div className="items-start space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:gap-x-6">
          <div className="group flex flex-col items-center xl:sticky xl:top-24">
            <Image
              src={SITE.author.avatar}
              alt={SITE.author.name}
              width={256}
              height={256}
              placeholder="blur"
              blurDataURL="/media/bonabrian/bonabrian-small.jpg"
              className="rounded-full object-cover transition-all duration-300 hover:scale-105 xl:rounded-lg"
              quality={100}
            />
            <div className="flex flex-col items-center py-2">
              <h3 className="font-cal text-lg">{SITE.author.name}</h3>
              <h4 className="text-muted-foreground">Software Engineer</h4>
            </div>
            <OpenForHire isOpenForHire={isAvailableForHire} />
          </div>

          <div className="prose dark:prose-dark max-w-none xl:col-span-3">
            <Biography />
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutPage;
