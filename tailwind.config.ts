const config = {
  theme: {
    extend: {
      typography: (theme: (value: string) => void) => ({
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            a: {
              textDecoration: 'none',
              color: 'var(--primary)',
              '&:hover': {
                textDecoration: 'underline',
                color: 'var(--primary)',
              },
              code: { color: 'var(--primary)' },
            },
            'h2, h3, h4, h5, h6': {
              position: 'relative',
              color: 'var(--foreground)',
            },
            img: {
              margin: '0 auto',
            },
            'code, pre code': {
              fontFamily: 'var(--font-mono)',
            },
            'code[data-theme], code[data-theme] span': {
              color: 'var(--shiki-light)',
              backgroundColor: 'var(--shiki-light-bg)',
            },
            '[data-rehype-pretty-code-figure]': {
              position: 'relative',
              marginTop: '1em',
              marginBottom: '1em',
            },
            ':not(pre) > code': {
              padding: '0.12em 0.25em',
              borderRadius: '0.375rem',
              display: 'inline-flex',
              lineHeight: '1.2',
              background: 'var(--accent)',
              color: 'var(--accent-foreground)',
              border: '1px solid var(--border)',
              '&::before, &::after': {
                content: 'none',
              },
            },
            pre: {
              background: 'var(--code)',
              padding: '1rem 0',
              lineHeight: 2,
              '[data-line-numbers]': {
                '[data-line]::before': {
                  counterIncrement: 'lineNumber',
                  content: 'counter(lineNumber)',
                  display: 'inline-block',
                  width: '1rem',
                  marginRight: '1rem',
                  textAlign: 'right',
                  color: 'var(--muted-foreground) / 0.6',
                },
              },
              '> code': {
                display: 'grid',
                counterReset: 'lineNumber',
                '> [data-line]': {
                  padding: '0 1rem 0 1rem',
                  borderLeft: '2px solid transparent',
                  lineHeight: 1.5,
                },
                '> [data-highlighted-line]': {
                  borderLeftColor: theme('colors.red.300'),
                  background: 'var(--primary) / 0.2',
                  '> span': {
                    backgroundColor: 'transparent',
                  },
                },
              },
            },
            '[data-rehype-pretty-code-title] ~ pre': {
              marginTop: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderTopWidth: 0,
            },
            '[data-rehype-pretty-code-title] ~ pre ~ button': {
              top: '3.75rem !important',
            },
            blockquote: {
              color: 'var(--foreground)',
              borderLeftColor: 'var(--accent)',
            },
            'p strong': {
              color: 'var(--foreground)',
            },
          },
        },
        dark: {
          css: {
            'code[data-theme], code[data-theme] span': {
              color: 'var(--shiki-dark)',
              backgroundColor: 'var(--shiki-dark-bg)',
            },
            pre: {
              border: '1px solid var(--border)',
              '> code': {
                '> [data-highlighted-line]': {
                  background: 'var(--primary) / 0.1',
                },
              },
            },
          },
        },
      }),
    },
  },
};

export default config;
