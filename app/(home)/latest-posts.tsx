'use client';

import { compareDesc } from 'date-fns';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

import type { Post } from '@/.contentlayer/generated';
import { allPosts } from '@/.contentlayer/generated';
import PostCard from '@/components/post-card';
import EmptyState from '@/components/shared/empty-state';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

const MAX_DISPLAY = 4;

const getLatestPosts = (maxDisplay: number = MAX_DISPLAY): Array<Post> =>
  allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, maxDisplay);

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const LatestPosts = () => {
  const postsRef = useRef<HTMLDivElement>(null);
  const posts = getLatestPosts();
  const isInView = useInView(postsRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={postsRef}
      transition={{ duration: 0.5 }}
      className={cn('will-change-[transform, opacity]')}
    >
      <motion.div
        className={cn('mb-4 flex flex-col')}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className={cn('font-cal text-primary font-bold')}>Writing</h2>
        <p
          className={cn(
            'font-cal text-secondary-foreground text-xl',
            'md:text-2xl',
          )}
        >
          Latest posts
        </p>
      </motion.div>
      {posts.length ? (
        <>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'grid auto-cols-fr grid-cols-1 gap-4',
              'md:grid-cols-2',
            )}
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </motion.div>
          <div className={cn('my-4 flex items-center justify-center')}>
            <Link href={ROUTES.blog}>
              <Button variant="outline">
                See all posts <ChevronRight />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <EmptyState message="The posts are playing hide and seek – we just can't find them!" />
      )}
    </motion.div>
  );
};

export default LatestPosts;
