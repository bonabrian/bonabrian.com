import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';

import { rehypeCode } from './rehype/rehype-code';
import { imageBlurMetadata } from './remark/blur';

export const rehypePlugins: PluggableList = [
  rehypeCode,
  rehypeAccessibleEmojis,
];
export const remarkPlugins: PluggableList = [remarkGfm, imageBlurMetadata];
