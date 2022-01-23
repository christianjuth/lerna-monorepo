import React from "react"

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type BreakpointGenerator<T> = Record<Breakpoint, T>

export type GlobalBreakpoints = BreakpointGenerator<number>
export type Breakpoints = Partial<BreakpointGenerator<number | string>>
export type ComputedBreakpoints = BreakpointGenerator<number | string>

export interface ColProps extends React.CSSProperties, Breakpoints {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

export interface RowProps extends React.CSSProperties {
  style?: React.CSSProperties
  children?: React.ReactNode
  spacing?: number
  className?: string
  inaccessiblyReverse?: boolean
}

export interface ConsumerProps {
  children: React.ReactElement
}

export type Context = {
  breakPoint: Breakpoint | null
  spacing: number
}

export interface DisplayProps extends Partial<BreakpointGenerator<boolean>> {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}
