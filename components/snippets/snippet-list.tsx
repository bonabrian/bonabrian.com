import type { Snippet } from '@/.contentlayer/generated';
import { cn } from '@/lib/utils';

import EmptyState from '../shared/empty-state';
import SnippetCard from './snippet-card';

const SnippetList = ({ snippets }: { snippets: Array<Snippet> }) => {
  return (
    <>
      {snippets.length ? (
        <div
          className={cn(
            'grid grid-flow-row auto-rows-auto grid-cols-1 gap-4',
            'md:grid-cols-2',
          )}
        >
          {snippets.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <EmptyState message="The snippets are probably off having a party somewhere without us!" />
      )}
    </>
  );
};

export default SnippetList;
