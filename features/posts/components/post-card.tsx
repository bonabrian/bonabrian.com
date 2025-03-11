'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import type { Post } from '@/.contentlayer/generated';
import IncrementCounter from '@/components/increment-counter';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { useViews } from '@/features/content/hooks/use-views';
import { formatDate } from '@/lib/utils';

const PostCard = ({ post }: { post: Post }) => {
  const { title, slug, date, excerpt, readingTime, image, imageMeta } = post;

  const { views, isLoading: isLoadViews } = useViews({ slug });

  const extraImageProps = useMemo(() => {
    if (imageMeta?.blur64) {
      return { placeholder: 'blur', blurDataURL: imageMeta.blur64 } as {
        placeholder: 'blur' | 'empty';
        blurDataURL?: string;
      };
    }

    return {};
  }, [imageMeta]);

  const publishedAt = formatDate(date);

  return (
    <Link href={`${ROUTES.blog}/${slug}`} className="group bg-card rounded-lg">
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
      <div className="text-muted-foreground flex items-center justify-between gap-2 p-4 text-sm">
        <time dateTime={publishedAt}>{publishedAt}</time>
        <div className="flex gap-2">
          <div title="Estimated read time">{readingTime?.text}</div>
          <span>&middot;</span>
          <div className="inline-flex gap-1">
            {isLoadViews ? (
              <Skeleton className="w-16" />
            ) : (
              <>
                <IncrementCounter to={views} /> views
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-4 pt-0">
        <h2 className="font-cal text-card-foreground text-lg md:text-xl">
          {title}
        </h2>
        <p className="text-muted-foreground">{excerpt}</p>
      </div>
    </Link>
  );
};

export default PostCard;
