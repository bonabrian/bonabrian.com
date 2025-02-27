const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
};

type BreakpointKey = keyof typeof breakpoints;

const getBreakpointValue = (bp: BreakpointKey): string => breakpoints[bp];

export const min = (bp: BreakpointKey): string =>
  `@media only screen and (min-width: ${getBreakpointValue(bp)})`;

export const max = (bp: BreakpointKey): string =>
  `@media only screen and (max-width: ${getBreakpointValue(bp)})`;

export const between = (bpMin: BreakpointKey, bpMax: BreakpointKey): string =>
  `@media only screen and (min-width: ${getBreakpointValue(
    bpMin,
  )}) and (max-width: ${getBreakpointValue(bpMax)})`;
