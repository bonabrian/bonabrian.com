'use client';

import { useSession } from 'next-auth/react';

import { useGuestbook } from '../hooks/use-guestbook';
import GuestbookAuth from './guestbook-auth';
import GuestbookEntries from './guestbook-entries';
import GuestbookSkeleton from './guestbook-skeleton';
import MessagePanel from './message-panel';

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

  return isLoading ? (
    <GuestbookSkeleton />
  ) : (
    <>
      <GuestbookEntries
        entries={entries}
        isWidget={isWidget}
        onDeleteMessage={onDeleteMessage}
      />
      {session ? (
        <MessagePanel
          onSendMessage={onSendMessage}
          isWidget={isWidget}
          session={session}
        />
      ) : (
        <GuestbookAuth />
      )}
    </>
  );
};

export default Guestbook;
