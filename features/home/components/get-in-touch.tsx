import { ChevronRightIcon, RocketIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SITE } from '@/constants';

const GetInTouch = () => {
  return (
    <div className="bg-card relative space-y-4 rounded-lg p-8">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 dark:bg-primary/30 text-primary rounded-full p-2">
          <RocketIcon />
        </div>
        <h3 className="font-cal text-card-foreground text-lg font-bold md:text-xl">
          Let's work together
        </h3>
      </div>
      <p className="text-muted-foreground">
        I'm available for freelance projects and would love to explore potential
        collaborations. Feel free to email me, and let's discuss how we can work
        together!
      </p>
      <Button asChild variant="shadow" className="group">
        <Link href={`mailto:${SITE.author.email}?subject=Hi Bona!`}>
          Get in touch
          <ChevronRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
};

export default GetInTouch;
