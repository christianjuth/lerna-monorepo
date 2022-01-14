import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react"
import styled, { css } from "styled-components"
import { color, roundness, Theme } from "./Theme"
import { GenericProps, DomEvents } from "./types"
import { pxToRem } from "./utils"
import { Animations } from "./Animations"
import { ImSpinner8 } from "react-icons/im"

type StyleProps = {
  $size: Button.Size
  $variant: Button.Variant
  $themeColor: Button.Color
  $fullWidth: boolean
  $uppercase: boolean
  $disabled?: boolean
}

const style = css<StyleProps>`
  display: flex;
  flex-direction: row;
  border-radius: ${roundness(1)};
  padding: 0;
  background: transparent;
  line-height: 1em;
  font-weight: bold;
  font-style: italic;
  letter-spacing: 0.06em;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  justify-content: center;
  height: fit-content;
  && {
    border: 2px solid transparent;
  }
  ${({ $disabled }) =>
    $disabled
      ? `
    &&&, &&&:hover {
      border-color: ${color("gray", 2)};
      color: ${color("gray", 5)};
      cursor: not-allowed;
    }
  `
      : ""}
  ${({ $uppercase }) =>
    $uppercase
      ? `
    text-transform: uppercase;
  `
      : ""}
  ${({ $fullWidth }) =>
    $fullWidth
      ? `
    width: 100%;
  `
      : ""}
  ${({ $size }) => {
    switch ($size) {
      case "sm":
        return `
          min-height: 31px;
          line-height: 31px;
          font-size: 1rem;
          padding: ${pxToRem(0, 10)};
        `
      case "md":
        return `
          min-height: 38px;
          line-height: 38px;
          font-size: 1.1rem;
          padding: ${pxToRem(0, 15)};
        `
      case "lg":
        return `
          min-height: 44px;
          line-height: 44px;
          font-size: 1.3rem;
          padding: ${pxToRem(0, 20)};
        `
    }
  }}
  ${({ $variant, $themeColor, $disabled }) => {
    switch ($variant) {
      case "contained":
        return `
          &&, &&:hover, &&:active {
            border-color: ${$themeColor === 'gray' ? color($themeColor, 15) : color($themeColor, 6)};
            background-color: ${$themeColor === 'gray' ? color($themeColor, 15) : color($themeColor, 6)};
            color: ${$themeColor === 'gray' ? color($themeColor, 15, 'text') : color($themeColor, 6, 'text')};
          }
          ${
            $disabled
              ? `
            &&, &&:hover {
              background-color: ${color("gray", 2)};
            }
          `
              : ""
          }
        `
      case "outlined":
        return `
          && {
            border-color: ${$themeColor === 'gray' ? color($themeColor, 15) : color($themeColor, 6)};
            color: ${$themeColor === 'gray' ? color($themeColor, 15) : color($themeColor, 6)};
            transition: background-color 0.2s, color 0.2s, border-color 0.2s;
          }
          &&:hover {
            background-color: ${$themeColor === 'gray' ? color($themeColor, 15) : color($themeColor, 6)};
            color: ${$themeColor === 'gray' ? color($themeColor, 15, 'text') : color($themeColor, 6, 'text')};  
          }
        `
    }
  }}
`

const StyledButton = styled.button<StyleProps>`
  ${style}
`
const StyledLink = styled.a<StyleProps>`
  ${style}
`

export declare namespace Button {
  export type Size = GenericProps.Size
  export type Variant = "contained" | "outlined"
  export type Color = Theme.ColorName

  export interface Props
    extends DomEvents<HTMLAnchorElement & HTMLButtonElement> {
    children: ReactNode
    style?: CSSProperties
    href?: string
    disabled?: boolean
    size?: Size
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
    className?: string
    variant?: Variant
    themeColor?: Color
    fullWidth?: boolean
    uppercase?: boolean
    tabIndex?: number
    loading?: boolean
  }
}

export function Button({
  children,
  style,
  href,
  disabled = false,
  size = "md",
  variant = "contained",
  className,
  themeColor = "accent1",
  fullWidth = false,
  uppercase = false,
  tabIndex,
  htmlType,
  loading = false,
  ...rest
}: Button.Props) {
  return typeof href === "string" ? (
    <StyledLink
      $disabled={disabled}
      $size={size}
      className={className}
      $variant={variant}
      style={style}
      href={!(disabled && !loading) ? href : undefined}
      $themeColor={themeColor}
      $fullWidth={fullWidth}
      $uppercase={uppercase}
      tabIndex={tabIndex}
      {...(rest as any)}
    >
      {children}

      {loading && (
        <Animations.Spin style={{ marginLeft: "0.5ch" }}>
          <ImSpinner8 />
        </Animations.Spin>
      )}
    </StyledLink>
  ) : (
    <StyledButton
      $disabled={disabled}
      disabled={loading || disabled}
      $size={size}
      className={className}
      $variant={variant}
      style={style}
      $themeColor={themeColor}
      $color={color}
      $fullWidth={fullWidth}
      $uppercase={uppercase}
      type={htmlType}
      tabIndex={tabIndex}
      {...(rest as any)}
    >
      {children}

      {loading && (
        <Animations.Spin style={{ marginLeft: "0.5ch" }}>
          <ImSpinner8 />
        </Animations.Spin>
      )}
    </StyledButton>
  )
}

export default Button