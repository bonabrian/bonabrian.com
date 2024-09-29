'use client';

import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import Container from './shared/container';
import Link from './shared/link';
import { Button } from './ui/button';

const BackButton = ({ href }: { href?: string }) => {
  const router = useRouter();

  const className =
    'flex gap-2 w-max hover:gap-3 items-center transition-all duration-200 font-medium cursor-pointer';

  return (
    <Container className={cn('pt-4', 'md:pt-8')}>
      <div className={cn('w-fit')}>
        {href ? (
          <Link href={href} className={cn(className)}>
            <ArrowLeftCircle />
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
            <ArrowLeftCircle />
            <span>Back</span>
          </Button>
        )}
      </div>
    </Container>
  );
};

export default BackButton;
