'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { CheckCircleIcon, LinkIcon, ShareIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import Counter from '@/components/counter';
import { Twitter } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BASE_URL, SITE } from '@/constants';
import { useCopyButton } from '@/hooks/use-copy-button';
import { useToast } from '@/hooks/use-toast';

import { useShares } from '../hooks/use-shares';

const ShareItemLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link href={href} className="flex items-center gap-2" onClick={onClick}>
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

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        description: (
          <span className="flex items-center gap-2">
            <CheckCircleIcon /> Copied to clipboard!
          </span>
        ),
        className: 'p-4',
      });
      addShare('CLIPBOARD');
    } catch {
      console.error('Failed to copy to clipboard.');
    }
  }, [addShare, currentUrl, toast]);

  const [, onClick] = useCopyButton(onCopy);

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
      className="flex flex-col items-center gap-2"
      initial={{ y: 16, opacity: 0, pointerEvents: 'none' }}
      animate={controls}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <ShareIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={onClick} className="cursor-pointer">
            <LinkIcon />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareItemLink
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&via=${SITE.author.twitter?.replace('@', '')}`}
              onClick={() => addShare('TWITTER')}
            >
              <Twitter /> Share on X
            </ShareItemLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Counter count={shares} />
    </motion.div>
  );
};

export default ShareButton;
