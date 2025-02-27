'use client';

import { Check, CheckCircle2, Copy } from 'lucide-react';
import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  useRef,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CodeBlockProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  'data-theme'?: string;
}

const CodeBlock = ({
  children,
  'data-theme': dataTheme = '',
  className,
  ...props
}: CodeBlockProps) => {
  const codeBlockRef = useRef<HTMLPreElement>(null);

  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const onCopyToClipboard = async () => {
    try {
      const content = codeBlockRef.current?.textContent ?? '';
      await navigator.clipboard.writeText(content);

      setCopied(true);
      toast({
        description: (
          <span className={cn('flex items-center gap-2')}>
            <CheckCircle2 /> Copied to clipboard!
          </span>
        ),
        className: 'p-4',
      });
      setTimeout(() => setCopied(false), 300);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <pre
        ref={codeBlockRef}
        data-theme={dataTheme}
        className={cn(
          'border-foreground/10 border border-t-transparent',
          // 'dark:border-none',
          className,
        )}
        {...props}
      >
        {children}
      </pre>
      <div className={cn('absolute top-0.5 right-0.5')}>
        <Button
          aria-label="Copy to clipboard"
          type="button"
          title="Copy to clipboard"
          variant="ghost"
          size="icon"
          onClick={onCopyToClipboard}
          className={cn('hover:bg-background/60')}
        >
          {copied ? (
            <Check className={cn('size-4')} />
          ) : (
            <Copy className={cn('size-4')} />
          )}
        </Button>
      </div>
    </>
  );
};

export default CodeBlock;
