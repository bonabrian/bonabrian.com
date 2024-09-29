'use client';

import { createContext, useContext } from 'react';

import type { Snippet } from '@/.contentlayer/generated';

export const SnippetContext = createContext<Snippet | null>(null);

export const useSnippetContext = () => {
  const context = useContext(SnippetContext);

  if (!context) {
    throw new Error('useSnippetContext must be used within a SnippetProvider');
  }

  return context;
};

const SnippetProvider = ({
  children,
  snippet,
}: {
  children: React.ReactNode;
  snippet: Snippet;
}) => {
  return (
    <SnippetContext.Provider value={snippet}>
      {children}
    </SnippetContext.Provider>
  );
};

export default SnippetProvider;
