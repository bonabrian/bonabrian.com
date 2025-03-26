'use client';

import { SendHorizontalIcon } from 'lucide-react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const MessagePanel = ({
  isWidget,
  session,
  onSendMessage,
}: {
  isWidget?: boolean;
  session: Session;
  onSendMessage: (message: string) => Promise<void>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (isSending) return;

    try {
      setIsSending(true);
      await onSendMessage(message);
      setMessage('');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'There was a problem to add your message.';

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => onSendMessage(message)}
          >
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsSending(false);
      setTimeout(() => inputRef?.current?.focus(), 100);
    }
  };

  return (
    <>
      <form
        className="border-muted flex items-center gap-x-2 border-t p-4"
        onSubmit={handleSendMessage}
      >
        <Input
          ref={inputRef}
          className="ring-offset-background focus-visible:ring-input grow transition-all duration-200 focus-visible:ring-1 focus-visible:outline-none"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          disabled={isSending}
          autoFocus
          placeholder="Type your message here..."
        />
        <Button
          type="submit"
          disabled={isSending || !message.trim()}
          className="py-1.5"
        >
          <SendHorizontalIcon className="size-5" />
        </Button>
      </form>
      <div
        className={cn(
          'flex flex-col items-start gap-2 px-4 md:flex-row md:items-center',
          isWidget ? 'pb-3 text-xs' : 'text-sm',
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <p>
            You are currently logged in as{' '}
            <span className={cn('font-cal')}>{session.user.name}</span>
          </p>
          {!isWidget && (
            <Button
              variant="link"
              className="h-auto p-0 font-semibold underline"
              onClick={async (e) => {
                e.preventDefault();
                await signOut();
              }}
            >
              Sign out
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagePanel;
