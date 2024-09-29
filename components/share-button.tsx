'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { CheckCircle2, Link as LinkIcon, Share } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BASE_URL, SITE } from '@/constants';
import useShares from '@/hooks/use-shares';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import Counter from './shared/counter';
import { Twitter } from './shared/icons';
import Link from './shared/link';

const ShareItemLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-1.5 rounded-sm px-2 py-2.5 text-sm',
        'hover:bg-accent',
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const ShareButton = ({ slug }: { slug: string }) => {
  const pathname = usePathname();
  const currentUrl = `${BASE_URL}${pathname}`;

  const { toast } = useToast();

  const { shares, addShare, isLoading } = useShares(slug);

  const controls = useAnimationControls();

  const onCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        description: (
          <span className={cn('flex items-center gap-2')}>
            <CheckCircle2 /> Copied to clipboard!
          </span>
        ),
        className: 'p-4',
      });
      addShare('CLIPBOARD');
    } catch {
      console.error('Failed to copy to clipboard');
    }
  };

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        transition: {
          delay: 0.2,
          duration: 0.15,
        },
      });
    }
  }, [controls, isLoading]);

  return (
    <motion.div
      className={cn('flex flex-col items-center gap-2')}
      initial={{ y: 16, opacity: 0, pointerEvents: 'none' }}
      animate={controls}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('hover:bg-background/60')}
          >
            <Share className={cn('size-4')} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn('w-56')} side="top">
          <DropdownMenuItem
            className={cn(
              'flex cursor-pointer items-center gap-1.5 px-2 py-2.5',
            )}
            onClick={onCopyToClipboard}
          >
            <LinkIcon className={cn('size-5')} />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ShareItemLink
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl,
              )}&via=${SITE.author.twitter?.replace('@', '')}`}
              onClick={() => addShare('TWITTER')}
            >
              <Twitter className={cn('size-5')} /> Share on X
            </ShareItemLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Counter count={shares} />
    </motion.div>
  );
};

export default ShareButton;
