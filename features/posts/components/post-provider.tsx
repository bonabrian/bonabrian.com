'use client';

import { createContext, useContext, useMemo } from 'react';

import type { Post } from '@/.content-collections/generated';

export const PostContext = createContext<Post | null>(null);

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }

  return context;
};

export const PostProvider = ({
  children,
  post,
}: {
  children: React.ReactNode;
  post: Post;
}) => {
  const value = useMemo(() => post, [post]);
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
