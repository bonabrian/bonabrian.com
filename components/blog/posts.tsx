'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { Post } from '@/.contentlayer/generated';
import { cn } from '@/lib/utils';

import EmptyState from '../shared/empty-state';
import { Input } from '../ui/input';
import PostCard from './post-card';

const filterPosts = (
  posts: Array<Post>,
  query: string | undefined | null = null,
): Array<Post> => {
  if (!posts) return [];

  const filteredPosts = !query
    ? posts
    : posts.filter((post) => {
        const searchContent = post.title + post.excerpt + post.tags?.join(' ');

        return searchContent.toLocaleLowerCase().includes(query.toLowerCase());
      });

  return filteredPosts;
};

const Posts = ({ posts }: { posts: Array<Post> }) => {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(
    () => filterPosts(posts, query),
    [posts, query],
  );

  const renderSearchComponent = () => {
    return (
      <div className={cn('relative flex-1')}>
        <Input
          aria-label="Search posts"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts"
          className={cn('pl-10')}
        />
        <Search className={cn('absolute left-2 top-1/2 -translate-y-1/2')} />
      </div>
    );
  };

  return (
    <>
      {renderSearchComponent()}
      {filteredPosts.length ? (
        <div
          className={cn(
            'my-8 grid grid-cols-1 gap-8',
            'md:my-12 md:grid-cols-2',
          )}
        >
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          message={
            query
              ? `No posts for "${query}". Perhaps the little guy is too busy running in the wheel of code.`
              : "The posts are playing hide and seek – we just can't find them!"
          }
        />
      )}
    </>
  );
};

export default Posts;
