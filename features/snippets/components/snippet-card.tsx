import Link from 'next/link';

import type { Snippet } from '@/.content-collections/generated';
import { ROUTES } from '@/constants/routes';

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  const { slug, title, description, tags } = snippet;

  return (
    <Link
      href={`${ROUTES.snippets}/${slug}`}
      className="group/snippet hover:bg-primary/5 relative flex flex-col place-items-stretch items-start space-y-2 self-start rounded-lg bg-transparent p-2.5 transition-colors lg:-mx-3 lg:w-[calc(100%+1.5rem)]"
      title={title}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-3">
          <p className="font-cal line-clamp-2 text-pretty group-hover/snippet:underline">
            {title}
          </p>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm text-pretty">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default SnippetCard;
