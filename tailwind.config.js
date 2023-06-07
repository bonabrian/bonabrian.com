/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')
const svgDataUri = require('mini-svg-data-uri')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        '12xl': '120rem',
      },
      fontFamily: {
        // uses `next/font` see `app/layout.tsx`
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Generated from https://colors.eva.design/
        primary: {
          100: '#f1e9ff',
          200: '#e3d3ff',
          300: '#d4bdff',
          400: '#c6adff',
          500: '#b192ff',
          600: '#876adb',
          700: '#6249b7',
          800: '#422e93',
          900: '#2b1c7a',
        },
        gray: colors.neutral,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.black'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.black'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.black'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.black'),
            },
            'h4,h5,h6': {
              color: theme('colors.black'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.100'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.400'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.slate.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.slate.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.slate.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.slate.100'),
            },
            blockquote: {
              color: theme('colors.slate.300'),
              borderLeftColor: theme('colors.gray.800'),
            },
            'p strong': {
              color: theme('colors.slate.100'),
            },
          },
        },
      }),
      keyframes: {
        equalize: {
          '0%, 100%': {
            height: '0px',
          },
          '50%': {
            height: '1rem',
          },
        },
      },
      animation: {
        equalize: 'equalize 0.8s infinite',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'grid-pattern': (value) => ({
            backgroundImage: `url("${svgDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="36" height="36" fill="none" stroke="${value}" stroke-dasharray="6 3" transform="scale(1)"><path d="M36 .5H1.5V36"/></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        },
      )
    },
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
