'use client';

import { ArrowLeftCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const BackButton = ({ href }: { href?: string }) => {
  const router = useRouter();

  const className =
    'flex gap-2 w-max hover:gap-3 items-center transition-all duration-200 font-medium cursor-pointer';

  return (
    <Container className="pt-4 md:pt-8">
      <div className="w-fit">
        {href ? (
          <Link href={href} className={className}>
            <ArrowLeftCircleIcon />
            <span>Back</span>
          </Link>
        ) : (
          <Button
            variant="ghost"
            className={cn(
              'hover:bg-transparent focus:bg-transparent',
              className,
            )}
            onClick={() => router.back()}
          >
            <ArrowLeftCircleIcon />
            <span>Back</span>
          </Button>
        )}
      </div>
    </Container>
  );
};

export default BackButton;
