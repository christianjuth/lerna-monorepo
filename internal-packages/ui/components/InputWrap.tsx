import { CSSProperties, useState } from "react"
import styled from "styled-components"
import { color, roundness, Theme } from "./Theme"
import { ReactChildren, GenericProps } from "./types"
import { pxToRem } from "./utils"

const InputWrapDiv = styled.div<{
  themeColor: Theme.ColorName
  fullWidth: boolean
  borderColor?: string
}>`
  position: relative;
  border-radius: ${roundness(1)};
  line-height: 1em;
  border: none;
  display: flex;
  align-items: center;
  background-color: ${color('gray', 0)};
  ${({ fullWidth }) => (fullWidth ? `width: 100%;` : "")}
  input::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  &:before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;
    border: 1px solid ${color("gray", 3)};
    pointer-events: none;
  }
  &[data-active="true"]:before {
    border-color: ${({ themeColor, borderColor }) =>
      borderColor ?? color(themeColor, 6)};
    border-width: 2px;
  }
  * {
    color: ${color("gray", 15)};
  }
`

export declare namespace InputWrap {
  interface Events
    extends Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      "onFocus" | "onBlur"
    > {}

  interface ChildProps extends Events {
    style: CSSProperties
    onFocus: (...args: any) => any
    onBlur: (...args: any) => any
  }

  interface Props extends React.HTMLProps<HTMLDivElement> {
    children: (props: ChildProps) => ReactChildren<string>
    themeColor?: Theme.ColorName
    customSize?: GenericProps.Size
    fullWidth?: boolean
    style?: CSSProperties
    borderColor?: string
    applyInputStylesToSelf?: boolean
    active?: boolean
  }
}

function getInputStyle(customSize: GenericProps.Size) {
  switch (customSize) {
    case "sm":
      return {
        minHeight: 40,
        fontSize: "1rem",
        padding: pxToRem(2, 9),
      }
    case "md":
      return {
        minHeight: 46,
        fontSize: "1.1rem",
        padding: pxToRem(2, 12),
      }
    case "lg":
      return {
        minHeight: 50,
        fontSize: "1.3rem",
        padding: pxToRem(2, 12),
      }
  }
}

export function InputWrap({
  children,
  themeColor = "accent1",
  customSize = "md",
  fullWidth = true,
  style,
  borderColor,
  applyInputStylesToSelf,
  active,
}: InputWrap.Props) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <InputWrapDiv
      themeColor={themeColor}
      fullWidth={fullWidth}
      data-active={active || isFocused}
      borderColor={borderColor}
      style={{
        ...(applyInputStylesToSelf ? getInputStyle(customSize) : {}),
        ...style,
      }}
    >
      {children({
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        style: {
          border: "none",
          height: "100%",
          width: "100%",
          outline: "none",
          borderRadius: "inherit",
          ...(applyInputStylesToSelf ? {} : getInputStyle(customSize)),
        },
      })}
    </InputWrapDiv>
  )
}