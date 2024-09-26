'use client';

import { useSession } from 'next-auth/react';

import { Skeleton } from '@/components/ui/skeleton';
import useGuestbook from '@/hooks/use-guestbook';
import { cn } from '@/lib/utils';

import Entries from './entries';
import MessagePanel from './message-panel';
import SignIn from './sign-in';

const Guestbook = ({ isWidget }: { isWidget?: boolean }) => {
  const { data: session } = useSession();
  const { entries, isLoading, addEntry, deleteEntry } = useGuestbook();

  const onSendMessage = async (message: string) => {
    try {
      await addEntry(message);
    } catch (error) {
      throw error;
    }
  };

  const onDeleteMessage = async (id: string) => {
    try {
      await deleteEntry(id);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={cn('space-y-4 py-4')}>
          {[...Array(3)].map((key, index) => (
            <div
              key={`${key}-${index}`}
              className={cn('flex items-start space-x-3 px-3')}
            >
              <Skeleton className={cn('size-10 rounded-full')} />
              <div className={cn('w-full space-y-1')}>
                <div
                  className={cn(
                    'flex flex-col items-start gap-3',
                    'md:flex-row md:items-center',
                  )}
                >
                  <Skeleton className={cn('mb-2 h-4 w-full', 'md:w-1/2')} />
                </div>
                <div className={cn('flex items-center')}>
                  <Skeleton className={cn('h-16 w-full')} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Entries
            entries={entries}
            onDeleteMessage={onDeleteMessage}
            isWidget={isWidget}
          />
          {session ? (
            <MessagePanel onSendMessage={onSendMessage} isWidget={isWidget} />
          ) : (
            <SignIn />
          )}
        </>
      )}
    </>
  );
};

export default Guestbook;
