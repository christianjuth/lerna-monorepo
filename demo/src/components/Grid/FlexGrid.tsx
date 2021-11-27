import React, { useContext } from "react"
import * as Types from "./types"
import { Context } from "./context"
import * as Styles from "./styles"

const breakPoints: Types.GlobalBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}
const breakPointKeys = Object.keys(breakPoints) as Types.Breakpoint[]

function Col(props: Types.ColProps) {
  const context = useContext(Context)
  const { spacing } = context
  const {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    style,
    children,
    className,
    ...cssProperties
  } = props
  const breakpointProps = { xs, sm, md, lg, xl, xxl }

  let crntWidth = ""
  const computedBreakPoints: Types.Breakpoints = {}
  breakPointKeys.forEach((key) => {
    if (typeof breakpointProps[key] === "number") {
      // @ts-ignore
      crntWidth = breakpointProps[key] / 0.24 + "%"
    } else if (typeof breakpointProps[key] === "string") {
      // @ts-ignore
      crntWidth = breakpointProps[key]
    }
    computedBreakPoints[key] = crntWidth
  })

  let computedStyle = Object.assign({}, style, cssProperties)

  return (
    <Styles.Col
      className={className}
      computedBreakPoints={computedBreakPoints as Types.ComputedBreakpoints}
      spacing={spacing}
      style={computedStyle}
      breakPoints={breakPoints}
    >
      {children}
    </Styles.Col>
  )
}

function Row({
  spacing = 0,
  children,
  style,
  className,
  inaccessiblyReverse = false,
  ...cssProperties
}: Types.RowProps) {
  const context = useContext(Context)

  const computedStyle = {
    display: "flex",
    flexDirection: inaccessiblyReverse ? "row-reverse" : "row",
    flexWrap: "wrap",
    marginLeft: -spacing / 2 + "px",
    marginRight: -spacing / 2 + "px",
    ...cssProperties,
    ...style,
  } as const

  return (
    <Context.Provider value={{ ...context, spacing }}>
      <div className={className} style={computedStyle}>
        {children}
      </div>
    </Context.Provider>
  )
}

export const FlexGrid = {
  Col,
  Row,
}
