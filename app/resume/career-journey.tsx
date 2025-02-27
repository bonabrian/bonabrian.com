import { differenceInMonths, differenceInYears, format } from 'date-fns';
import Image from 'next/image';

import { Document } from '@/components/shared/icons';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { EXPERIENCES } from '@/constants';
import { cn, formatDate } from '@/lib/utils';

const CareerJourney = () => {
  const lastUpdated = formatDate('2024-01-06');

  return (
    <>
      <div className={cn('mb-12', 'md:mb-16')}>
        <Button asChild variant="shadow" className={cn('gap-x-1')}>
          <Link href="/resume/download" target="_blank">
            <Document /> Download resume
          </Link>
        </Button>
      </div>
      <div className={cn('prose max-w-none px-4', 'dark:prose-dark')}>
        <ol className={cn('border-border list-none space-y-4 border-l pl-10')}>
          {EXPERIENCES.map(
            ({
              company,
              role,
              startDate,
              endDate,
              stacks,
              accomplishments,
            }) => {
              const start = new Date(startDate);
              const end = endDate ? new Date(endDate) : new Date();

              const durationInYears = differenceInYears(end, start);
              const durationInMonths = differenceInMonths(end, start) % 12;

              let durationText = '';

              if (durationInYears > 0) {
                durationText += `${durationInYears} yr${durationInYears > 1 ? 's' : ''} `;
              }

              if (durationInMonths > 0 || durationInYears === 0) {
                durationText += `${durationInMonths} mo${durationInMonths > 1 ? 's' : ''}`;
              }

              return (
                <li key={company.name} className={cn('relative h-full')}>
                  <div
                    className={cn('absolute bottom-0 -left-[60px] mt-0 h-full')}
                  >
                    <div className={cn('sticky top-20 flex items-start')}>
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={40}
                        height={40}
                        className={cn('ml-0 rounded-full')}
                      />
                    </div>
                  </div>
                  <div
                    className={cn(
                      'flex flex-col items-start gap-1',
                      'md:flex-row',
                    )}
                  >
                    <div className={cn('flex flex-col space-y-1 leading-snug')}>
                      <h2 className={cn('font-cal my-0 text-lg')}>{role}</h2>
                      <div
                        className={cn(
                          'text-muted-foreground flex items-center gap-1',
                        )}
                      >
                        <Link
                          href={company.url}
                          className={cn(
                            'text-muted-foreground underline',
                            'hover:text-foreground',
                          )}
                        >
                          {company.name}
                        </Link>
                        <span>&middot;</span>
                        <span>{company.jobType}</span>
                      </div>
                      <div className={cn('text-muted-foreground flex gap-1')}>
                        <div className={cn('flex gap-1')}>
                          <span>{format(start, 'MMM yyyy')}</span> -{' '}
                          <span>
                            {endDate ? format(endDate, 'MMM yyyy') : 'Present'}
                          </span>
                        </div>
                        <span>&middot;</span>
                        <span>{durationText}</span>
                      </div>
                      <div
                        className={cn(
                          'text-muted-foreground flex items-center gap-1',
                        )}
                      >
                        <span>{company.location}</span>
                        <span>&middot;</span>
                        <span>{company.workplaceType}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn('my-4 flex flex-row flex-wrap gap-1')}>
                    {stacks.map(({ name, icon }) => (
                      <Tooltip key={name}>
                        <TooltipTrigger asChild>
                          <div className={cn('bg-card rounded-lg p-1.5')}>
                            {icon}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>{name}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                  <ul className={cn('pl-0')}>
                    {accomplishments.map((accomplishment, index) => (
                      <li key={index} className={cn('my-1 leading-snug')}>
                        <span className={cn('text-muted-foreground')}>
                          {accomplishment}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            },
          )}
        </ol>
        <div className={cn('mt-12')}>
          <p className={cn('text-muted-foreground')}>
            Last updated at{' '}
            <time dateTime={lastUpdated} className={cn('font-cal')}>
              {lastUpdated}
            </time>
          </p>
        </div>
      </div>
    </>
  );
};

export default CareerJourney;
