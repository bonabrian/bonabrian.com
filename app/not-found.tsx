import Container from '@/components/shared/container';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NotFoundPage = () => (
  <>
    <title>Page Not Found</title>
    <Container
      className={cn(
        'font-cal h-[calc(100vh-272px)] items-center justify-center',
      )}
    >
      <h1
        title="404"
        className={cn(
          'animate-glitch text-7xl',
          'before:animate-glitch-top before:absolute before:left-0 before:content-[attr(title)] before:[clip-path:polygon(0%_0%,100%_0%,100%_33%,0%_33%)]',
          'after:animate-glitch-bottom after:absolute after:left-0 after:content-[attr(title)] after:[clip-path:polygon(0%_67%,100%_67%,100%_100%,0%_100%)]',
        )}
      >
        404
      </h1>
      <h2 className={cn('animate-pulse text-center text-xl')}>
        Oops! This page went on vacation without telling us. 🏖️
      </h2>
      <Link href="/" className={cn('mt-4')}>
        <Button variant="secondary">Go back</Button>
      </Link>
    </Container>
  </>
);

export default NotFoundPage;
