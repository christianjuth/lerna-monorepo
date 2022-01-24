import { CSSProperties, ReactChild, useState } from "react";
import styled from "styled-components";
import { color, roundness, Theme } from "./Theme";
import { GenericProps, ReactChildren } from "./types";
import { pxToRem } from "./utils";

const ACTIVE_BORDER_WIDTH = 2;
const VERTICAL_PADDING = 2;

const InputWrapDiv = styled.div<{
  themeColor: Theme.ColorName;
  fullWidth: boolean;
  $variant?: "outlined" | "transparent";
  $hideBorder?: boolean;
}>`
  position: relative;
  border-radius: ${roundness(1)};
  line-height: 1em;
  border: none;
  display: flex;
  align-items: center;
  ${({ fullWidth }) => (fullWidth ? `width: 100%;` : "")}
  input::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  transition: border-with 0.2s, opacity 0.2s;

  ${({ $variant }) =>
    $variant === "transparent"
      ? `
        opacity: 0.75;
        background-color: hsla(0, 0%, calc(var(--dark-mode-bit) * 100%), calc(0.12 + (var(--dark-mode-bit) / 10)));

        &[data-active="true"] {
          opacity: 1;
        } 
      `
      : `background-color: ${color("gray", 0)};`}

  ${({ $hideBorder }) =>
    $hideBorder
      ? ""
      : `
    &:before {
      content: " ";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      border-width: 1px;
      border-style: solid;
      pointer-events: none;
      border-color: ${color("gray", 4)};
      opacity: 0.9;
    }
  `}

  &[data-active="true"]:before {
    border-color: ${({ themeColor }) =>
      themeColor === "gray" ? color(themeColor, 15) : color(themeColor, 6)};
    border-width: ${ACTIVE_BORDER_WIDTH}px;
    opacity: 1;
  }
  * {
    color: ${color("gray", 15)};
  }

  *::placeholder {
    opacity: 0.55;
    color: ${color("gray", 15)};
  }
`;

export declare namespace InputWrap {
  interface Events
    extends Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      "onFocus" | "onBlur"
    > {}

  interface ChildProps extends Events {
    style: CSSProperties;
    onFocus: (...args: any) => any;
    onBlur: (...args: any) => any;
  }

  type ChildFn = (props: ChildProps) => ReactChildren<string>;

  interface Props extends React.HTMLProps<HTMLDivElement> {
    children: ChildFn | [ChildFn, ReactChild];
    themeColor?: Theme.ColorName;
    customSize?: GenericProps.Size;
    fullWidth?: boolean;
    style?: CSSProperties;
    applyInputStylesToSelf?: boolean;
    active?: boolean;
    variant?: "outlined" | "transparent";
    className?: string;
    hideBorder?: boolean;
  }
}

function getInputStyle(customSize: GenericProps.Size) {
  switch (customSize) {
    case "sm":
      return {
        minHeight: 35 - VERTICAL_PADDING,
        fontSize: "1rem",
        padding: pxToRem(VERTICAL_PADDING, 9),
      };
    case "md":
      return {
        minHeight: 42 - VERTICAL_PADDING,
        fontSize: "1.1rem",
        padding: pxToRem(VERTICAL_PADDING, 12),
      };
    case "lg":
      return {
        minHeight: 48 - VERTICAL_PADDING,
        fontSize: "1.3rem",
        padding: pxToRem(VERTICAL_PADDING, 12),
      };
  }
}

export function InputWrap({
  children,
  themeColor = "accent1",
  customSize = "md",
  fullWidth = true,
  style,
  applyInputStylesToSelf,
  active,
  variant = "outlined",
  className,
  hideBorder,
}: InputWrap.Props) {
  const [isFocused, setIsFocused] = useState(false);

  const [childFn, otherChild] =
    typeof children === "function" ? [children] : children;

  return (
    <InputWrapDiv
      themeColor={themeColor}
      fullWidth={fullWidth}
      data-active={active || isFocused}
      $variant={variant}
      style={{
        ...(applyInputStylesToSelf ? getInputStyle(customSize) : {}),
        ...style,
      }}
      className={className}
      $hideBorder={hideBorder || variant === "transparent"}
    >
      {childFn({
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
      {otherChild}
    </InputWrapDiv>
  );
}
