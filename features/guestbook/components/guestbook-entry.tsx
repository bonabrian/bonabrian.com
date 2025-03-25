'use client';

import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { SITE } from '@/constants/site';
import { useToast } from '@/hooks/use-toast';

import type { Guestbook } from '../types';
import Timestamp from './timestamp';

const GuestbookEntry = ({
  entry,
  onDelete,
}: {
  entry: Guestbook;
  onDelete: (id: string) => Promise<void>;
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const { id, body, createdAt, user } = entry;
  const { name, email, image } = user;

  const authorEmail = SITE.author.email;
  const isAuthor = email === authorEmail;

  const mentionPattern = /@([^:]+):/g;

  const modifiedMessage = body.split(mentionPattern).map((message, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} className="text-primary text-sm font-semibold">
          @{message}
        </span>
      );
    }

    return <span key={index}>{message}</span>;
  });

  const onDeleteMessage = async (id: string) => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await onDelete(id);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'There was a problem to delete your message.';

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: message,
        action: (
          <ToastAction altText="Try again" onClick={() => onDeleteMessage(id)}>
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-start gap-3 px-3">
      <Image
        src={image as string}
        width={40}
        height={40}
        alt={name}
        className="aspect-square rounded-full"
      />
      <div className="space-y-1">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="font-cal text-sm">{name}</div>
            {isAuthor && (
              <div className="bg-primary/10 font-cal text-primary dark:bg-primary/20 rounded-full px-1.5 py-0.5 text-xs">
                Author
              </div>
            )}
            <div className="hidden md:flex">
              <Timestamp datetime={createdAt} />
            </div>
          </div>
        </div>
        <div className="group flex items-center gap-3">
          <p className="bg-muted w-fit rounded-xl rounded-tl-none px-3 py-2">
            {modifiedMessage}
          </p>
          <div className="flex items-center">
            {(session?.user.email === email ||
              session?.user.email === authorEmail) && (
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-background p-0"
                onClick={async () => await onDeleteMessage(id)}
                disabled={isDeleting}
              >
                <TrashIcon className="text-destructive hidden size-5 cursor-pointer group-hover:flex" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestbookEntry;
