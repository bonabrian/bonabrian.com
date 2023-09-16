import resolveConfig from 'tailwindcss/resolveConfig'
import type { Config, ScreensConfig } from 'tailwindcss/types/config'

import tailwindConfig from '../../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig as unknown as Config)

const breakpoints = fullConfig?.theme?.screens || {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

type BreakpointKey = keyof ScreensConfig

const getBreakpointValue = <K extends string>(bp: K) =>
  breakpoints[bp as BreakpointKey]

export const min = <K extends string>(bp: K): string =>
  `@media only screen and (min-width: ${getBreakpointValue(bp)})`

export const max = <K extends string>(bp: K): string =>
  `@media only screen and (max-width: ${getBreakpointValue(bp)})`

export const between = <K extends string>(bpMin: K, bpMax: K): string =>
  `@media only screen and (min-width: ${getBreakpointValue(
    bpMin,
  )}) and (max-width: ${getBreakpointValue(bpMax)})`
