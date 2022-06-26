import { Global } from '@emotion/react'

import CSSReset from './CSSReset'

const fontPrimary = 'Recursive, sans-serif'

export const GlobalStyles = () => {
  return (
    <>
      <CSSReset />
      <Global
        styles={{
          ':root': {
            '--font-primary': fontPrimary,
          },
          body: {
            fontFamily: 'var(--font-primary)',
          },
        }}
      />
    </>
  )
}

export default GlobalStyles
