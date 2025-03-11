'use client';

import { SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { Post } from '@/.contentlayer/generated';
import EmptyState from '@/components/empty-state';
import { Input } from '@/components/ui/input';

import PostCard from './post-card';

const filterPosts = (
  posts: Post[],
  query: string | undefined | null = null,
): Post[] => {
  if (!posts) return [];

  const filteredPosts = !query
    ? posts
    : posts.filter((post) => {
        const searchContent = post.title + post.excerpt + post.tags?.join(' ');

        return searchContent
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase());
      });

  return filteredPosts;
};

const FilteredPosts = ({ posts }: { posts: Post[] }) => {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(
    () => filterPosts(posts, query),
    [posts, query],
  );

  return (
    <div className="space-y-8">
      <div className="relative flex-1">
        <Input
          aria-label="Search posts"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts"
          className="ring-offset-background focus-visible:ring-input pl-8 transition-all duration-200 focus-visible:ring-1 focus-visible:outline-none"
        />
        <SearchIcon className="absolute top-1/2 left-2 size-5 -translate-y-1/2" />
      </div>
      {filteredPosts.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
