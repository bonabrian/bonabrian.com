'use client';

import type { FormEvent } from 'react';
import { useRef, useState } from 'react';

import { PaperPlane } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import UserInfo from './user-info';

const MessagePanel = ({
  onSendMessage,
  isWidget,
}: {
  onSendMessage: (message: string) => Promise<void>;
  isWidget?: boolean;
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
        className={cn('flex items-center gap-x-2 border-t border-muted p-4')}
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          className={cn(
            'flex w-full flex-grow rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          disabled={isSending}
          ref={inputRef}
          autoFocus
        />
        <Button
          type="submit"
          disabled={isSending || !message.trim()}
          size="icon"
        >
          <PaperPlane />
        </Button>
      </form>
      <UserInfo isWidget={isWidget} />
    </>
  );
};

export default MessagePanel;
