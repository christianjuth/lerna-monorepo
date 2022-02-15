import { unsafeCSS } from 'lit';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type BreakpointGenerator<T> = Record<Breakpoint, T>;

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};
export const breakPointKeys: Breakpoint[] = Object.keys(
  breakpoints
) as Breakpoint[];

export function compareBreakpoints(target: Breakpoint, breakPoint: Breakpoint) {
  return breakpoints[target] > breakpoints[breakPoint];
}

export function computeBreakpoints<T>(
  breakpts: Partial<BreakpointGenerator<T>>
): BreakpointGenerator<T> {
  const computedBreakPoints: Partial<BreakpointGenerator<T>> = {};
  let crntWidth: T;

  breakPointKeys.forEach(key => {
    crntWidth = breakpts[key] ?? crntWidth;
    computedBreakPoints[key] = crntWidth;
  });

  return computedBreakPoints as any;
}

export function mediaQuery(lower?: Breakpoint, upper?: Breakpoint) {
  let query = 'only screen';

  if (lower) {
    query += ` and (min-width: ${breakpoints[lower]} px)`;
  }

  if (upper) {
    query += ` and (max-width: ${breakpoints[upper]} px)`;
  }

  return unsafeCSS(query);
}
