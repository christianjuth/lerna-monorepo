import styled, { css } from "styled-components"
import {
  GlobalBreakpoints,
  ComputedBreakpoints,
  BreakpointGenerator,
} from "./types"
import { mediaQuery } from "./utils"

export const Col = styled.div<{
  spacing: number
  computedBreakPoints: ComputedBreakpoints
  breakPoints: GlobalBreakpoints
}>`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 ${({ spacing }) => spacing / 2}px;

  @media (max-width: ${({ breakPoints }) => breakPoints.sm - 1 + "px"}) {
    display: ${({ computedBreakPoints }) =>
      computedBreakPoints.xs === "0%" ? "none" : null};
    min-width: ${({ computedBreakPoints }) => computedBreakPoints.xs};
    width: ${({ computedBreakPoints }) => computedBreakPoints.xs};
    max-width: ${({ computedBreakPoints }) => computedBreakPoints.xs};
  }

  @media (min-width: ${({ breakPoints }) =>
      breakPoints.sm + "px"}) and (max-width: ${({ breakPoints }) =>
      breakPoints.md - 1 + "px"}) {
    display: ${({ computedBreakPoints }) =>
      computedBreakPoints.sm === "0%" ? "none" : null};
    min-width: ${({ computedBreakPoints }) => computedBreakPoints.sm};
    width: ${({ computedBreakPoints }) => computedBreakPoints.sm};
    max-width: ${({ computedBreakPoints }) => computedBreakPoints.sm};
  }

  @media (min-width: ${({ breakPoints }) =>
      breakPoints.md + "px"}) and (max-width: ${({ breakPoints }) =>
      breakPoints.lg - 1 + "px"}) {
    display: ${({ computedBreakPoints }) =>
      computedBreakPoints.md === "0%" ? "none" : null};
    min-width: ${({ computedBreakPoints }) => computedBreakPoints.md};
    width: ${({ computedBreakPoints }) => computedBreakPoints.md};
    max-width: ${({ computedBreakPoints }) => computedBreakPoints.md};
  }

  @media (min-width: ${({ breakPoints }) =>
      breakPoints.lg + "px"}) and (max-width: ${({ breakPoints }) =>
      breakPoints.xl - 1 + "px"}) {
    display: ${({ computedBreakPoints }) =>
      computedBreakPoints.lg === "0%" ? "none" : null};
    min-width: ${({ computedBreakPoints }) => computedBreakPoints.lg};
    width: ${({ computedBreakPoints }) => computedBreakPoints.lg};
    max-width: ${({ computedBreakPoints }) => computedBreakPoints.lg};
  }

  @media (min-width: ${({ breakPoints }) =>
      breakPoints.xl + "px"}) and (max-width: ${({ breakPoints }) =>
      breakPoints.xxl - 1 + "px"}) {
    display: ${({ computedBreakPoints }) =>
      computedBreakPoints.xl === "0%" ? "none" : null};
    min-width: ${({ computedBreakPoints }) => computedBreakPoints.xl};
    width: ${({ computedBreakPoints }) => computedBreakPoints.xl};
    max-width: ${({ computedBreakPoints }) => computedBreakPoints.xl};
  }

  @media (min-width: ${({ breakPoints }) => breakPoints.xxl + "px"}) {
    display: ${({ computedBreakPoints }) =>
      computedBreakPoints.xxl === "0%" ? "none" : null};
    min-width: ${({ computedBreakPoints }) => computedBreakPoints.xxl};
    width: ${({ computedBreakPoints }) => computedBreakPoints.xxl};
    max-width: ${({ computedBreakPoints }) => computedBreakPoints.xxl};
  }
`

export const displayStyles = css<{
  computedBreakpoints: BreakpointGenerator<boolean>
}>`
  flex-direction: column;

  @media ${mediaQuery("xs", "sm")} {
    display: ${({ computedBreakpoints }) =>
      computedBreakpoints.xs ? "flex" : "none"};
  }
  @media ${mediaQuery("sm", "md")} {
    display: ${({ computedBreakpoints }) =>
      computedBreakpoints.sm ? "flex" : "none"};
  }
  @media ${mediaQuery("md", "lg")} {
    display: ${({ computedBreakpoints }) =>
      computedBreakpoints.md ? "flex" : "none"};
  }
  @media ${mediaQuery("lg", "xl")} {
    display: ${({ computedBreakpoints }) =>
      computedBreakpoints.lg ? "flex" : "none"};
  }
  @media ${mediaQuery("xl", "xxl")} {
    display: ${({ computedBreakpoints }) =>
      computedBreakpoints.xl ? "flex" : "none"};
  }
  @media ${mediaQuery("xxl")} {
    display: ${({ computedBreakpoints }) =>
      computedBreakpoints.xxl ? "flex" : "none"};
  }
`

export const DisplayDiv = styled.div`
  ${displayStyles}
`

export const DisplayBr = styled.div`
  ${displayStyles}
`
