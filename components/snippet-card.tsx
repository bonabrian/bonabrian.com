import type { Snippet } from '@/.contentlayer/generated';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

import Link from './shared/link';
import RenderIf from './shared/render-if';

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  const { _id, slug, title, description, tags } = snippet;

  return (
    <Link
      key={_id}
      href={`${ROUTES.snippets}/${slug}`}
      className={cn(
        'animate-border-gradient relative w-full rounded-xl bg-gradient-to-r from-pink-400 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 transition [animation-duration:_6s]',
        'hover:shadow-sm',
      )}
    >
      <div
        className={cn(
          'bg-card flex h-full flex-col justify-between rounded-[10px] p-4',
        )}
      >
        <div className={cn('mb-4 flex flex-col')}>
          <h2
            className={cn(
              'font-cal text-card-foreground text-lg font-bold',
              'md:text-xl',
            )}
          >
            {title}
          </h2>
          <p className={cn('mt-2')}>{description}</p>
        </div>
        <RenderIf isTrue={(tags ?? []).length > 0}>
          <div className={cn('mt-4 flex gap-2')}>
            {tags?.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className={cn(
                  'bg-primary font-cal text-background rounded-full px-2.5 py-1 text-xs leading-tight whitespace-nowrap',
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </RenderIf>
      </div>
    </Link>
  );
};

export default SnippetCard;
