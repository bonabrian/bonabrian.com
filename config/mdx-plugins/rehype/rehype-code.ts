import { type RehypeShikiOptions } from '@shikijs/rehype';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import type { Root } from 'hast';
import type { BuiltinTheme } from 'shiki';
import {
  bundledLanguages,
  createOnigurumaEngine,
  getSingletonHighlighter,
  type ShikiTransformer,
} from 'shiki';
import type { Plugin } from 'unified';

import {
  createStyleTransformer,
  defaultThemes,
} from '@/config/highlight/shiki';

import { transformerIcon } from './transformer-icon';

interface MetaValue {
  name: string;
  regex: RegExp;
}

/**
 * Custom meta string values
 */
const metaValues: MetaValue[] = [
  {
    name: 'title',
    regex: /title="(?<value>[^"]*)"/,
  },
];

export const rehypeCode: Plugin<[RehypeShikiOptions], Root> = () => {
  const transformers: ShikiTransformer[] = [
    {
      name: 'rehype-code:pre-process',
      preprocess(code, { meta }) {
        if (meta && '__parsed_raw' in meta) {
          meta.__raw = meta.__parsed_raw;
          delete meta.__parsed_raw;
        }

        // Remove empty line at end
        return code.replace(/\n$/, '');
      },
    },
    transformerIcon(),
    createStyleTransformer(),
    transformerNotationHighlight({
      matchAlgorithm: 'v3',
    }),
    transformerNotationWordHighlight({
      matchAlgorithm: 'v3',
    }),
    transformerNotationDiff({
      matchAlgorithm: 'v3',
    }),
    transformerMetaHighlight({ className: 'highlighted' }),
  ];

  const highlighter = getSingletonHighlighter({
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
    themes: Object.values(defaultThemes).filter(Boolean) as BuiltinTheme[],
    langs: Object.keys(bundledLanguages),
  });

  const transformer = highlighter.then((instance) =>
    rehypeShikiFromHighlighter(instance, {
      themes: defaultThemes,
      defaultColor: false,
      defaultLanguage: 'plaintext',
      transformers,
      parseMetaString(meta) {
        const map: Record<string, string> = {};

        for (const value of metaValues) {
          meta = meta.replace(value.regex, (_, ...args) => {
            const first = args.at(0);
            map[value.name] = typeof first === 'string' ? first : '';

            return '';
          });
        }

        map.__parsed_raw = meta;
        return map;
      },
    }),
  );

  return async (tree, file) => {
    await (
      await transformer
    )(tree, file, () => {
      // do nothing
    });
  };
};
