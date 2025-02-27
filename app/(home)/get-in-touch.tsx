import { Rocket } from 'lucide-react';

import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { SITE } from '@/constants';
import { cn } from '@/lib/utils';

const GetInTouch = () => {
  return (
    <div className={cn('bg-card relative rounded-xl p-8')}>
      <div className={cn('flex items-center gap-2')}>
        <Rocket />
        <h3
          className={cn(
            'font-cal text-card-foreground text-lg font-bold',
            'md:text-xl',
          )}
        >
          Let's work together!
        </h3>
      </div>
      <p className={cn('text-muted-foreground mt-2')}>
        I'm available for freelance projects and would love to explore potential
        collaborations. Feel free to email me, and let's discuss how we can work
        together!
      </p>
      <Button asChild className={cn('mt-4')} variant="shadow">
        <Link href={`mailto:${SITE.author.email}?subject=Hi Bona!`}>
          Get in touch
        </Link>
      </Button>
    </div>
  );
};

export default GetInTouch;
