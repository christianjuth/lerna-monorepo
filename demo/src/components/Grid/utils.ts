import { Breakpoint, BreakpointGenerator } from "./types"

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}
export const breakPointKeys: Breakpoint[] = Object.keys(
  breakpoints
) as Breakpoint[]

export function getBreakpoint(windowWidth: number): Breakpoint {
  let breaker: Breakpoint = "xs"

  breakPointKeys.forEach((key: Breakpoint) => {
    if (windowWidth > breakpoints[key]) {
      breaker = key
    }
  })

  return breaker
}

export function compareBreakpoints(target: Breakpoint, breakPoint: Breakpoint) {
  return breakpoints[target] > breakpoints[breakPoint]
}

export function computeBreakpoints<T>(
  breakpoints: Partial<BreakpointGenerator<T>>
): BreakpointGenerator<T> {
  const computedBreakPoints: Partial<BreakpointGenerator<T>> = {}
  let crntWidth: T

  breakPointKeys.forEach((key) => {
    crntWidth = breakpoints[key] ?? crntWidth
    computedBreakPoints[key] = crntWidth
  })

  return computedBreakPoints as any
}

export function mediaQuery(lower?: Breakpoint, upper?: Breakpoint) {
  let query = "only screen"

  if (lower) {
    query += " and (min-width: " + breakpoints[lower] + "px)"
  }

  if (upper) {
    query += " and (max-width: " + breakpoints[upper] + "px)"
  }

  return query
}