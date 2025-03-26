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
            blockquote: {
              color: 'var(--foreground)',
              borderLeftColor: 'var(--accent)',
            },
            'p strong': {
              color: 'var(--foreground)',
            },
          },
        },
      }),
    },
  },
};

export default config;
