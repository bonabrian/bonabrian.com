'use client';

import { createContext, useContext } from 'react';

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
  return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};
