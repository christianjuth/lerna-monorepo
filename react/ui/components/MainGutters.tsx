import * as React from "react"
import styled from "styled-components"
import { mediaQuery } from './Grid/utils'

export type ReactChild<T = never> = React.ReactNode | null | T
export type ReactChildren<T = never> = ReactChild<T> | ReactChildren<T>[]

const MAIN_GUTTERS_PADDING = "calc(1vw + 8px)"
const MOBILE_QUERY = ["xs", "lg"] as const
const DESKTOP_QUERY = ["lg"] as const

type TargetScreen = "always" | "mobile-only" | "desktop-only" | "none"

export declare namespace MainGutters {
  type Props = {
    children?: ReactChildren<String>
    innerStyle?: React.CSSProperties
    style?: React.CSSProperties
    className?: string
    leftGutter?: TargetScreen
    rightGutter?: TargetScreen
    padding?: TargetScreen
    baseWidth?: number
    maxWidth?: number
  }
}

const Wrap = styled.div<
  Pick<MainGutters.Props, "leftGutter" | "rightGutter" | "padding">
>`
  display: flex;
  flex-direction: column;
  grid-row-start: 1;
  grid-row-end: 2;
  ${({ padding }) => {
    if (padding === "mobile-only" || padding === "desktop-only") {
      const query = padding === "mobile-only" ? MOBILE_QUERY : DESKTOP_QUERY
      return `
        padding-right: 0;
        padding-left: 0;
        @media ${mediaQuery(...query)} {
          margin-right: ${MAIN_GUTTERS_PADDING};
          margin-left: ${MAIN_GUTTERS_PADDING};
        }
      `
    }
    if (padding === "always") {
      return `
        margin-right: ${MAIN_GUTTERS_PADDING};
        margin-left: ${MAIN_GUTTERS_PADDING};
      `
    }
  }}
  ${({ leftGutter }) => {
    switch (leftGutter) {
      case "always":
        return "grid-column-start: 2;"
      case "desktop-only":
        return `
          grid-column-start: 1;
          @media ${mediaQuery(...DESKTOP_QUERY)} {
            grid-column-start: 2;
          }
          @media ${mediaQuery(...MOBILE_QUERY)} {
            margin-left: 0;
          }
        `
      case "mobile-only":
        return `
          grid-column-start: 1;
          @media ${mediaQuery(...DESKTOP_QUERY)} {
            margin-left: 0;
          }
          @media ${mediaQuery(...MOBILE_QUERY)} {
            grid-column-start: 2;
          }
        `
      case "none":
        return `
          grid-column-start: 1;
          && { margin-left: 0; }
        `
    }
  }}
  ${({ rightGutter }) => {
    switch (rightGutter) {
      case "always":
        return "grid-column-end: 3;"
      case "desktop-only":
        return `
          grid-column-end: 4;
          @media ${mediaQuery(...DESKTOP_QUERY)} {
            grid-column-end: 3;
          }
          @media ${mediaQuery(...MOBILE_QUERY)} {
            margin-right: 0;
          }
        `
      case "mobile-only":
        return `
          grid-column-end: 4;
          @media ${mediaQuery(...DESKTOP_QUERY)} {
            margin-right: 0;
          }
          @media ${mediaQuery(...MOBILE_QUERY)} {
            grid-column-end: 3;
          }
        `
      case "none":
        return `
          grid-column-end: 4;
          && { margin-right: 0; }
        `
    }
  }}
`

export function MainGutters({
  children,
  className,
  style,
  innerStyle,
  rightGutter = "always",
  leftGutter = "always",
  padding = "always",
  baseWidth = 1000,
  maxWidth,
}: MainGutters.Props) {
  const middleCol = maxWidth ? `${maxWidth}px` : `calc(${baseWidth}px + 22vw)`

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `1fr minmax(auto, ${middleCol}) 1fr`,
        gridTemplateRows: "100%",
        width: "100%",
        ...style,
      }}
    >
      <Wrap
        padding={padding}
        rightGutter={rightGutter}
        leftGutter={leftGutter}
        style={innerStyle}
      >
        {children}
      </Wrap>
    </div>
  )
}
MainGutters.padding = MAIN_GUTTERS_PADDING

export default MainGutters