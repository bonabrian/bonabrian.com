import { Rocket } from 'lucide-react';

import { SITE } from '@/constants';
import { cn } from '@/lib/utils';

import Link from '../shared/link';
import { Button } from '../ui/button';

const GetInTouch = () => {
  return (
    <div className={cn('relative rounded-xl bg-card p-8')}>
      <div className={cn('flex items-center gap-2')}>
        <Rocket />
        <h3
          className={cn(
            'font-cal text-lg font-bold text-card-foreground',
            'md:text-xl',
          )}
        >
          Let's work together!
        </h3>
      </div>
      <p className={cn('mt-2 text-muted-foreground')}>
        I'm available for freelance projects and would love to explore potential
        collaborations. Feel free to email me, and let's discuss how we can work
        together!
      </p>
      <Button asChild className={cn('mt-4')}>
        <Link href={`mailto:${SITE.author.email}?subject=Hi Bona!`}>
          Get in touch
        </Link>
      </Button>
    </div>
  );
};

export default GetInTouch;
