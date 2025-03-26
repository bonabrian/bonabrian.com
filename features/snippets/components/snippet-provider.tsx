'use client';

import { createContext, useContext, useMemo } from 'react';

import type { Snippet } from '@/.content-collections/generated';

export const SnippetContext = createContext<Snippet | null>(null);

export const useSnippetContext = () => {
  const context = useContext(SnippetContext);

  if (!context) {
    throw new Error('useSnippetContext must be used within a SnippetProvider');
  }

  return context;
};

export const SnippetProvider = ({
  children,
  snippet,
}: {
  children: React.ReactNode;
  snippet: Snippet;
}) => {
  const value = useMemo(() => snippet, [snippet]);

  return (
    <SnippetContext.Provider value={value}>{children}</SnippetContext.Provider>
  );
};
