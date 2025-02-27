import { Code, Terminal } from 'lucide-react';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { JavaScript, Kotlin, TypeScript } from '../icons';

interface CodeBlockHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  'data-language'?: string;
}

const CodeBlockHeader = ({
  'data-language': dataLanguage,
  children,
  className,
  ...props
}: CodeBlockHeaderProps) => {
  const getLanguageIcon = (language: string): React.ReactNode => {
    switch (language) {
      case 'bash':
      case 'sh':
      case 'shell':
      case 'zsh':
        return <Terminal className={cn('size-4')} />;
      case 'ts':
        return <TypeScript className={cn('size-4')} />;
      case 'js':
        return <JavaScript className={cn('size-4')} />;
      case 'kotlin':
      case 'kt':
        return <Kotlin className={cn('size-4')} />;

      default:
        return <Code className={cn('size-4')} />;
    }
  };

  return (
    <figcaption
      data-language={dataLanguage}
      className={cn(
        'border-foreground/10 bg-card text-foreground flex items-center gap-2 rounded-t-md border border-b-transparent px-4 py-3 font-mono',
        className,
      )}
      {...props}
    >
      {dataLanguage && getLanguageIcon(dataLanguage)}
      {children}
    </figcaption>
  );
};

export default CodeBlockHeader;
