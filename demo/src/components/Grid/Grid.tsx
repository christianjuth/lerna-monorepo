import { useContext, CSSProperties, ReactNode, forwardRef } from "react"
import styled from "styled-components"
import * as contextExports from "./context"
import { Context } from "./context"
import { computeBreakpoints, mediaQuery } from "./utils"
import { Breakpoint, BreakpointGenerator } from './types'

export interface ColProps extends Partial<BreakpointGenerator<number>> {
  style?: CSSProperties
  children?: ReactNode
  className?: string
}

export interface RowProps {
  style?: CSSProperties
  children?: ReactNode
  spacing?: number | string
  className?: string
  /**
   * Keep this number as low as possible to avoid
   * horizontal overflow. For example, 6 might be
   * a good number of columns since its low, but
   * divisible by both 2, and 3.
   */
  cols?: string | number
  /**
   * This method of reversing is inaccessible
   * because it only reverses the order visually
   * and not for people using screen readers
   */
  inaccessiblyReverse?: boolean
}

const ColStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  direction: ltr;

  @media ${mediaQuery("xs", "sm")} {
    display: var(--gridDisplay-xs);
    grid-column-end: span var(--gridWidth-xs);
  }

  @media ${mediaQuery("sm", "md")} {
    display: var(--gridDisplay-sm);
    grid-column-end: span var(--gridWidth-sm);
  }

  @media ${mediaQuery("md", "lg")} {
    display: var(--gridDisplay-md);
    grid-column-end: span var(--gridWidth-md);
  }

  @media ${mediaQuery("lg", "xl")} {
    display: var(--gridDisplay-lg);
    grid-column-end: span var(--gridWidth-lg);
  }

  @media ${mediaQuery("xl", "xxl")} {
    display: var(--gridDisplay-xl);
    grid-column-end: span var(--gridWidth-xl);
  }

  @media ${mediaQuery("xxl")} {
    display: var(--gridDisplay-xxl);
    grid-column-end: span var(--gridWidth-xxl);
  }
`

const Col = forwardRef<HTMLDivElement, ColProps>(function Col(props, ref) {
  const { xs, sm, md, lg, xl, xxl, style, children, className, ...rest } = props
  const computedBreakpoints = computeBreakpoints({
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  })

  const vars: Record<string, string | number> = {}

  ;(Object.keys(computedBreakpoints) as Breakpoint[]).forEach((breakpoint) => {
    vars[`--gridWidth-${breakpoint}`] = computedBreakpoints[breakpoint]
    vars[`--gridDisplay-${breakpoint}`] =
      computedBreakpoints[breakpoint] === 0 ? "none" : "flex"
  })

  return (
    <ColStyle
      style={{
        ...style,
        ...vars,
      }}
      className={[className, "col"].join(' ')}
      ref={ref}
      {...rest}
    >
      {children}
    </ColStyle>
  )
})

const RowStyle = styled.div`
  display: grid;
  flex: 1;
  align-items: flex-start;
`

const Row = forwardRef<HTMLDivElement, RowProps>(function Row(
  {
    cols,
    spacing = 0,
    children,
    style,
    className,
    inaccessiblyReverse = false,
    ...rest
  },
  ref
) {
  const context = {
    ...contextExports.defaultContextValue,
    breakPoint: useContext(Context).breakPoint,
  }

  if (typeof cols === "number") {
    cols = Array.from({ length: cols })
      .map(() => "1fr")
      .join(" ")
  }

  if (typeof spacing === "number") {
    spacing = spacing + "px"
  }

  return (
    <Context.Provider
      value={{
        ...context,
        cols: cols || context.cols,
      }}
    >
      <RowStyle
        className={className}
        style={{
          gridGap: spacing,
          gridTemplateColumns: cols ?? context.cols,
          direction: inaccessiblyReverse ? "rtl" : undefined,
          ...style,
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </RowStyle>
    </Context.Provider>
  )
})

export const Grid = {
  Row,
  Col,
}
