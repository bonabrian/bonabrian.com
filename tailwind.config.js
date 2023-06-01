/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        '12xl': '120rem',
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
        pink: {
          100: '#FEE9E7',
          200: '#FECFD0',
          300: '#FCB7BF',
          400: '#FAA4B7',
          500: '#F786AA',
          600: '#D46191',
          700: '#B1437C',
          800: '#8F2A68',
          900: '#76195B',
        },
        green: {
          100: '#D8F9D9',
          200: '#B3F4BB',
          300: '#86DF9A',
          400: '#60C07F',
          500: '#32965D',
          600: '#248155',
          700: '#196C4D',
          800: '#0F5743',
          900: '#09483D',
        },
        red: {
          100: '#FEE2D6',
          200: '#FEBFAD',
          300: '#FC9484',
          400: '#FA6B65',
          500: '#F8333C',
          600: '#D5253C',
          700: '#B2193B',
          800: '#8F1038',
          900: '#770935',
        },
        blue: {
          100: '#D7FCFF',
          200: '#B0F4FF',
          300: '#88E7FF',
          400: '#6BD7FF',
          500: '#3ABEFF',
          600: '#2A95DB',
          700: '#1D70B7',
          800: '#125093',
          900: '#0B387A',
        },
        yellow: {
          100: '#FEF7CC',
          200: '#FEEC9A',
          300: '#FEDE68',
          400: '#FDD042',
          500: '#FCBA04',
          600: '#D89902',
          700: '#B57B02',
          800: '#925F01',
          900: '#784B00',
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
