import React, { useContext, useState, useEffect } from "react"
import { breakPointKeys, breakpoints, compareBreakpoints } from "./utils"
import * as Types from "./types"

export const defaultContextValue: Types.Context = {
  breakPoint: null,
  spacing: 0,
  cols: new Array(24).fill("1fr").join(" "),
}

export const Context = React.createContext<Types.Context>(defaultContextValue)

export function useGrid() {
  return useContext(Context)
}

export function useBreakPoint(breakPoint: Types.Breakpoint) {
  return compareBreakpoints(useContext(Context).breakPoint ?? "xs", breakPoint)
}

export function Provider(props: any) {
  function getBreakpoint() {
    let width = typeof window !== "undefined" ? window.innerWidth : 0
    let breaker: Types.Breakpoint | null = null
    breakPointKeys.forEach((key: Types.Breakpoint) => {
      if (width > breakpoints[key]) {
        breaker = key
      }
    })
    return breaker
  }

  const [breakPoint, setBreakPoint] = useState<Types.Breakpoint | null>("xs")

  useEffect(() => {
    const onLayout = () => setBreakPoint(getBreakpoint())
    onLayout()
    window.addEventListener("resize", onLayout)
    return () => {
      window.removeEventListener("resize", onLayout)
    }
  }, [])

  return (
    <Context.Provider value={{ ...defaultContextValue, breakPoint }}>
      <div style={{ flex: 1, height: "100%" }}>{props.children}</div>
    </Context.Provider>
  )
}

export function Consumer({
  children,
}: {
  children: (context: {
    breakPoint: Types.Breakpoint | null
    spacing: number
  }) => any
}) {
  return children(useGrid())
}

export function BreakpointSwitch(styles: any) {
  const { breakPoint } = useContext(Context)

  let style: any
  breakPointKeys.forEach((key: Types.Breakpoint) => {
    if (
      styles[key] !== undefined &&
      breakPoint !== null &&
      breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)
    ) {
      style = styles[key]
    }
  })

  return style
}
