'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Trash } from '@/components/shared/icons';
import RenderIf from '@/components/shared/render-if';
import Timestamp from '@/components/shared/timestamp';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { SITE } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Guestbook } from '@/types/guestbook';

const Entry = ({
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

  const pattern = /@([^:]+):/g;

  const modifiedMessage = body.split(pattern).map((message, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} className={cn('text-primary text-sm font-semibold')}>
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
    <div className={cn('flex items-start gap-3 px-3')}>
      <Image
        src={image ?? ''}
        width={40}
        height={40}
        alt={name}
        className={cn('aspect-square rounded-full')}
      />
      <div className={cn('space-y-1')}>
        <div
          className={cn(
            'flex flex-col items-start gap-3',
            'md:flex-row md:items-center',
          )}
        >
          <div className={cn('flex items-center gap-2')}>
            <div className={cn('font-cal text-sm')}>{name}</div>
            <RenderIf isTrue={isAuthor}>
              <div
                className={cn(
                  'bg-primary/10 font-cal text-primary rounded-full px-1.5 py-0.5 text-xs',
                  'dark:bg-primary/20',
                )}
              >
                Author
              </div>
            </RenderIf>
            <div className={cn('hidden', 'md:flex')}>
              <Timestamp datetime={createdAt} />
            </div>
          </div>
        </div>
        <div className={cn('group flex items-center gap-3')}>
          <p
            className={cn(
              'bg-muted w-fit rounded-xl rounded-tl-none px-3 py-2',
            )}
          >
            {modifiedMessage}
          </p>
          <div className={cn('flex items-center')}>
            <RenderIf
              isTrue={
                session?.user.email === email ||
                session?.user.email === authorEmail
              }
            >
              <Button
                size="icon"
                variant="ghost"
                className={cn('hover:bg-background p-0')}
                onClick={async () => await onDeleteMessage(id)}
                disabled={isDeleting}
              >
                <Trash
                  className={cn(
                    'text-destructive hidden size-6 cursor-pointer',
                    'group-hover:flex',
                  )}
                />
              </Button>
            </RenderIf>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
