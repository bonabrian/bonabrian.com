'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { Post } from '@/.contentlayer/generated';
import { cn } from '@/lib/utils';

import PostCard from './post-card';
import EmptyState from './shared/empty-state';
import { Input } from './ui/input';

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

const FilteredPosts = ({ posts }: { posts: Array<Post> }) => {
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
        <Search className={cn('absolute top-1/2 left-2 -translate-y-1/2')} />
      </div>
    );
  };

  return (
    <div className={cn('space-y-8')}>
      {renderSearchComponent()}
      {filteredPosts.length ? (
        <div className={cn('grid grid-cols-1 gap-4', 'md:grid-cols-2')}>
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
    </div>
  );
};

export default FilteredPosts;
