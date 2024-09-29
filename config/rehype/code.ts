import rehypePrettyCode from 'rehype-pretty-code';

interface RehypeElement {
  type: string;
  tagName?: string;
  value?: string;
  attributes?: Record<string, unknown>;
  properties: {
    className?: Array<string>;
    style?: string;
  } & Record<string, unknown>;
  children?: Array<RehypeElement>;
}

export const prettyCode = [
  rehypePrettyCode,
  {
    theme: {
      dark: 'one-dark-pro',
      light: 'github-light',
    },
    tokensMap: {
      // VScode command palette: Inspect Editor Tokens and Scopes
      // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
      fn: 'entity.name.function',
      objKey: 'meta.object-literal.key',
    },
    onVisitLine(node?: RehypeElement | null) {
      if (!node) return;
      // Prevent lines from collapsing in `display: grid` mode, and
      // allow empty lines to be copy/pasted
      if (node.children?.length === 0) {
        node.children = [
          { type: 'text', value: ' ', properties: { className: [] } },
        ];
      }
    },
    // Feel free to add classNames that suit your docs
    onVisitHighlightedLine(node?: RehypeElement | null) {
      if (!node) return;
      node.properties?.className?.push('line--highlighted');
    },
    onVisitHighlightedWord(node?: RehypeElement | null) {
      if (!node) return;
      // eslint-disable-next-line no-param-reassign
      node.properties.className = ['word'];
    },
  },
];
