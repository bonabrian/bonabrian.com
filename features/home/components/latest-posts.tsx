'use client';

import { compareDesc } from 'date-fns';
import { motion, useInView } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import type { Post } from '@/.contentlayer/generated';
import { allPosts } from '@/.contentlayer/generated';
import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import PostCard from '@/features/posts/components/post-card';

import { MAX_LATEST_POSTS_DISPLAY } from '../constants';

const getLatestPosts = (
  maxDisplay: number = MAX_LATEST_POSTS_DISPLAY,
): Array<Post> =>
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
      className="will-change-[transform,opacity]"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex flex-col"
      >
        <h2 className="font-cal text-primary text-sm tracking-wide md:text-base">
          Writing
        </h2>
        <p className="font-cal text-secondary-foreground md:text-xl">
          Latest posts
        </p>
      </motion.div>
      {posts.length ? (
        <>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid auto-cols-fr grid-cols-1 gap-4 md:grid-cols-2"
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </motion.div>
          <div className="my-8 flex items-center justify-center">
            <Button asChild variant="outline">
              <Link href={ROUTES.projects}>
                See all posts <ChevronRightIcon />
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <EmptyState message="The posts are playing hide and seek – we just can't find them!" />
      )}
    </motion.div>
  );
};

export default LatestPosts;
