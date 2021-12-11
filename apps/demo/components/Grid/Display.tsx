import { computeBreakpoints } from "./utils"
import * as Styles from "./styles"
import { BreakpointGenerator } from "./types"
import { CSSProperties, ReactNode, forwardRef } from "react"

export interface DisplayProps extends Partial<BreakpointGenerator<boolean>> {
  style?: CSSProperties
  children?: ReactNode
  className?: string
  tag?: "div" | "br"
}

export const Display = forwardRef<HTMLDivElement, DisplayProps>(
  function Display({ children, className, style, tag = "div", ...rest }, ref) {
    const computedBreakPoints = computeBreakpoints(rest)

    const Tag = tag === "div" ? Styles.DisplayDiv : Styles.DisplayBr

    return (
      <Tag
        computedBreakpoints={computedBreakPoints}
        className={className}
        style={style}
        ref={ref}
        {...rest}
      >
        {children}
      </Tag>
    )
  }
)
