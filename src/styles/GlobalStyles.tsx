import { Global } from '@emotion/react'

import CSSReset from './CSSReset'

const darkTheme = {
  bgPrimary: 'rgb(17, 17, 17)',
  bgSecondary: 'rgb(25, 25, 25)',
  headerBg: 'rgba(17, 17, 17, 0.8)',
  textPrimary: 'rgb(255, 255, 255)',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  colorPrimary: 'rgb(255, 196, 255)',
  boxBg: 'rgb(43, 43, 43)',
}

const lightTheme = {
  bgPrimary: 'rgb(255, 255, 255)',
  bgSecondary: 'rgb(247, 247, 247)',
  headerBg: 'rgba(255, 255, 255, 0.8)',
  textPrimary: 'rgb(17, 17, 17)',
  textSecondary: 'rgba(17, 17, 17, 0.6)',
  colorPrimary: 'rgb(216, 91, 216)',
  boxBg: 'rgb(230, 230, 230)',
}

const fontPrimary = 'Montserrat, sans-serif'

export const GlobalStyles = () => {
  return (
    <>
      <CSSReset />
      <Global
        styles={{
          ':root': {
            '--font-primary': fontPrimary,
            '--line-height-base': '1.5',
          },
          '[data-theme="dark"]': {
            '--bg-primary': darkTheme.bgPrimary,
            '--bg-secondary': darkTheme.bgSecondary,
            '--header-bg': darkTheme.headerBg,
            '--text-primary': darkTheme.textPrimary,
            '--text-secondary': darkTheme.textSecondary,
            '--color-primary': darkTheme.colorPrimary,
            '--box-bg': darkTheme.boxBg,
          },
          '[data-theme="light"]': {
            '--bg-primary': lightTheme.bgPrimary,
            '--bg-secondary': lightTheme.bgSecondary,
            '--header-bg': lightTheme.headerBg,
            '--text-primary': lightTheme.textPrimary,
            '--text-secondary': lightTheme.textSecondary,
            '--color-primary': lightTheme.colorPrimary,
            '--box-bg': lightTheme.boxBg,
          },
          // base
          body: {
            fontFamily: 'var(--font-primary)',
            color: 'var(--text-primary)',
            backgroundColor: 'var(--bg-primary)',
            transitionProperty: 'background-color',
            transitionDuration: '200ms',
            WebkitTextSizeAdjust: '100%',
            lineHeight: 'var(--line-height-base)',
          },
        }}
      />
    </>
  )
}

export default GlobalStyles
