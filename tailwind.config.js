/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/lib/**/*.ts',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        content: 'calc(100vh - 4rem)',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      letterSpacing: {
        tightest: '-0.075rem',
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Generated from https://colors.eva.design/
        primary: {
          100: '#F2E9FF',
          200: '#E3D3FF',
          300: '#D4BDFF',
          400: '#C6ACFF',
          500: '#B191FF',
          600: '#8769DB',
          700: '#6249B7',
          800: '#422E93',
          900: '#2C1B7A',
        },
        success: {
          100: '#F4FCCF',
          200: '#E6FAA1',
          300: '#D0F170',
          400: '#B8E34B',
          500: '#96D117',
          600: '#7AB310',
          700: '#61960B',
          800: '#497907',
          900: '#396404',
        },
        danger: {
          100: '#FFE9D6',
          200: '#FFCDAD',
          300: '#FFAB83',
          400: '#FF8A65',
          500: '#FF5432',
          600: '#DB3424',
          700: '#B71B19',
          800: '#930F18',
          900: '#7A0919',
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
          },
        },
      }),
      keyframes: {
        shrink: {
          '0% , 100%': {
            height: '0.75rem',
          },
          '50%': {
            height: '0.375rem',
          },
        },
      },
      animation: {
        shrink: 'shrink 1.5s infinite',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
