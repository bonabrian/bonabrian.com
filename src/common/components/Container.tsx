import { css } from '@emotion/react'
import * as React from 'react'

import { breakpoints } from '../utils'

type Props = {
  children: React.ReactNode
}

const Container = ({ children }: Props) => {
  return (
    <div
      css={css`
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        max-width: 48rem;
        @media (min-width: ${breakpoints.sm}) {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        @media (min-width: ${breakpoints.xl}) {
          padding-left: 0;
          padding-right: 0;
          max-width: 64rem;
        }
      `}
    >
      {children}
    </div>
  )
}

export default Container
