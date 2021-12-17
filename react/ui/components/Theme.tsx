import { useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'

const SHADES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const
const SHADE_STOPS = SHADES.length

function clamp(min: number, val: number, max: number) {
  return Math.max(min, Math.min(val, max))
}

const GlobalStyles = createGlobalStyle<{ vars: string }>`
  ${({ vars }) => vars}

  body {
    background-color: ${color('gray', 0)};
    color: ${color('gray', 15)};
  }

  a,
  .link {
    color: ${color('accent1', 4)};
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: ${color('gray', 1)};
    }
  }
`

export declare namespace Theme {
  type ColorName = 'primary' | 'accent1' | 'gray'
  type HSLColor = [number, number, number, number?]

  type ColorFn = (parmas: { l: number }) => HSLColor

  type Config = Record<ColorName, ColorFn>
}

function varName(color: Theme.ColorName, shade: number) {
  return `--${color}-${shade}`
}

export function color(color: Theme.ColorName, shade: number) {
  return `var(${varName(color, shade)})`
}

function hslToString([h, s, l, a]: Theme.HSLColor) {
  return `hsl(${h} ${s}% ${Math.round(l)}%${a ? `/ ${clamp(0, a, 100)}%` : ""})`
}

function generatePallet(color: Theme.ColorName, fn: Theme.ColorFn) {
  let vars = ''
  for (let shade = 0; shade < SHADE_STOPS; shade++) {
    const l = (100 / (SHADE_STOPS - 1)) * (SHADE_STOPS - 1 - shade)
    vars += `${varName(color, shade)}: ${hslToString(fn({ l }))};`
  }
  return vars
}

function getVars(palette: Partial<Theme.Config>) {
  return Object.entries(palette).map(([color, fn]) => generatePallet(color as Theme.ColorName, fn)).join('')
}

export const spacing = (...multipliers: number[]) => {
  return multipliers
    .map((multiplier) => {
      return multiplier * 5 + "px"
    })
    .join(" ")
}

export function Theme({
  base,
  dark
}: {
  base: Theme.Config,
  dark: Partial<Theme.Config>
}) {

  const vars = useMemo(
    () => `
      :root { ${getVars(base)} }
      @media (prefers-color-scheme: dark) { :root { ${getVars(dark)} } }
    `,
    [base, dark]
  )

  return (
    <GlobalStyles vars={vars} />
  )
}