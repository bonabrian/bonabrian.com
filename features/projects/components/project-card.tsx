'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cloneElement, useMemo } from 'react';

import type { Project } from '@/.content-collections/generated';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ROUTES } from '@/constants/routes';
import { STACKS } from '@/constants/stacks';
import { cn } from '@/lib/utils';

const ProjectCard = ({ project }: { project: Project }) => {
  const {
    title,
    description,
    slug,
    image,
    imageMeta,
    url,
    playStoreUrl,
    stacks,
  } = project;

  const parsedImageMeta: {
    width: number;
    height: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
  } = JSON.parse(imageMeta);

  const extraImageProps = useMemo(() => {
    if (image && parsedImageMeta?.blurDataURL) {
      return {
        placeholder: 'blur',
        blurDataURL: parsedImageMeta.blurDataURL,
      } as {
        placeholder: 'blur' | 'empty';
        blurDataURL?: string;
      };
    }

    return {};
  }, [image, parsedImageMeta.blurDataURL]);

  let projectUrl = url ?? `${ROUTES.projects}/${slug}`;
  if (playStoreUrl) projectUrl = playStoreUrl;

  return (
    <Link href={projectUrl} className="group bg-card rounded-lg">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-cover bg-no-repeat">
        <div className="absolute size-full" />
        <Image
          src={image as string}
          alt={title}
          fill
          className="rounded-t-lg object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          {...extraImageProps}
        />
      </div>
      <div className="flex flex-col space-y-2 p-4">
        <h2 className="font-cal text-card-foreground text-lg md:text-xl">
          {title}
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {stacks && stacks.length > 0 && (
        <div className="mx-4 mb-4 flex flex-wrap items-end gap-2">
          {stacks.map((stack) => (
            <Tooltip key={stack}>
              <TooltipTrigger asChild>
                <span>
                  {cloneElement(STACKS[stack], {
                    className: cn(
                      `${STACKS[stack].props.className ?? ''} size-6`,
                    ),
                  })}
                </span>
              </TooltipTrigger>
              <TooltipContent>{stack}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </Link>
  );
};

export default ProjectCard;
