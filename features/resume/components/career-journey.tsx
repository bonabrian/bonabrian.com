import { differenceInMonths, differenceInYears } from 'date-fns';
import { format } from 'date-fns-tz';
import { FileTextIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ROUTES } from '@/constants/routes';
import { formatDate } from '@/lib/utils';

import { EXPERIENCES } from '../experiences';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

const CareerJourney = () => {
  const lastUpdated = formatDate('2025-03-10');

  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild variant="shadow">
          <Link
            href={`${ROUTES.resume}/download`}
            target="_blank"
            className="gap-x-1"
          >
            <FileTextIcon />
            Download resume
          </Link>
        </Button>
      </div>
      <div className="prose dark:prose-dark max-w-none px-4">
        <ol className="border-border list-none space-y-4 border-l pl-10">
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
                <li
                  key={`${company.name}-${role}-${startDate}`}
                  className="relative h-full"
                >
                  <div className="absolute bottom-0 -left-[60px] mt-0 h-full">
                    <div className="sticky top-20 flex items-start">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={40}
                        height={40}
                        className="ml-0 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1 md:flex-row">
                    <div className="flex flex-col space-y-1 leading-snug">
                      <h2 className="font-cal my-0 text-lg">{role}</h2>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Link
                          href={company.url}
                          target="_blank"
                          className="text-muted-foreground hover:text-foreground underline"
                        >
                          {company.name}
                        </Link>
                        <span>&middot;</span>
                        <span>{company.jobType}</span>
                      </div>
                      <div className="text-muted-foreground flex gap-1">
                        <div className="flex gap-1">
                          <span>{format(start, 'MMM yyyy')}</span> -{' '}
                          <span>
                            {endDate ? format(endDate, 'MMM yyyy') : 'Present'}
                          </span>
                        </div>
                        <span>&middot;</span>
                        <span>{durationText}</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <span>{company.location}</span>
                        <span>&middot;</span>
                        <span>{company.workingArrangement}</span>
                      </div>
                    </div>
                  </div>
                  <div className="my-4 flex flex-row flex-wrap gap-1">
                    {stacks.map(({ name, icon }) => (
                      <Tooltip key={name}>
                        <TooltipTrigger asChild>
                          <div className="bg-card rounded-lg p-1.5">{icon}</div>
                        </TooltipTrigger>
                        <TooltipContent>{name}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                  <ul className="pl-0">
                    {accomplishments.map((accomplishment, index) => (
                      <li key={index} className="my-1 leading-snug">
                        <span className="text-muted-foreground">
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
        <div className="mt-12">
          <p className="text-muted-foreground">
            Last updated at{' '}
            <time dateTime={lastUpdated} className="font-cal">
              {lastUpdated}
            </time>
          </p>
        </div>
      </div>
    </>
  );
};

export default CareerJourney;
