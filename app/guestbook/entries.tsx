'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import type { Guestbook } from '@/types/guestbook';

import Entry from './entry';

interface EntriesProps {
  entries: Guestbook[];
  onDeleteMessage: (id: string) => Promise<void>;
  isWidget?: boolean;
}

const WIDGET_HEIGHT = 480;
const HEIGHT_GAP = 256;

const Entries = ({ entries, onDeleteMessage, isWidget }: EntriesProps) => {
  const entriesRef = useRef<HTMLDivElement>(null);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [entriesHeight, setEntriesHeight] = useState(
    WIDGET_HEIGHT - HEIGHT_GAP,
  );

  useEffect(() => {
    const handleScroll = () => {
      if (entriesRef.current) {
        const isScrolledToBottom =
          entriesRef.current.scrollHeight - entriesRef.current.clientHeight <=
          entriesRef.current.scrollTop;

        setHasScrolledUp(!isScrolledToBottom);
      }
    };

    const currentEntriesRef = entriesRef.current;

    currentEntriesRef?.addEventListener('scroll', handleScroll);

    return () => {
      currentEntriesRef?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (entriesRef.current && !hasScrolledUp) {
      entriesRef.current.scrollTop = entriesRef.current.scrollHeight;
    }
  }, [entries, hasScrolledUp]);

  useEffect(() => {
    const handleResize = () => {
      const height = isWidget ? WIDGET_HEIGHT : window.innerHeight - HEIGHT_GAP;
      setEntriesHeight(height);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isWidget]);

  return (
    <div className={cn('px-1')}>
      <div
        className={cn('space-y-4 overflow-hidden overflow-y-auto py-4')}
        style={{ height: entriesHeight }}
        ref={entriesRef}
      >
        {entries.length ? (
          <>
            {entries.map((entry) => (
              <Entry key={entry.id} entry={entry} onDelete={onDeleteMessage} />
            ))}
          </>
        ) : (
          <div
            className={cn(
              'flex h-full flex-col justify-center space-y-4 px-3 text-center',
            )}
          >
            <p>
              If you come across this, you might just be the first to share your
              suggestions, ask questions, or contribute in any way you see fit.
            </p>
            <p>
              Simply <span className={cn('font-semibold')}>log in</span> to get
              started. :)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Entries;
