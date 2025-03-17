import type { ShikiTransformer } from 'shiki';

export const createStyleTransformer = (): ShikiTransformer => {
  return {
    name: 'rehype-code:styles',
    line(hast) {
      if (hast.children.length === 0) {
        // Keep the empty lines when using grid layout
        hast.children.push({
          type: 'text',
          value: ' ',
        });
      }
    },
  };
};

export const defaultThemes: Record<string, string> = {
  light: 'github-light',
  dark: 'one-dark-pro',
};
