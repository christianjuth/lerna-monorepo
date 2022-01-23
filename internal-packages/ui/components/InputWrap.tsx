import { CSSProperties, useState } from "react";
import styled from "styled-components";
import { color, roundness, Theme } from "./Theme";
import { ReactChildren, GenericProps } from "./types";
import { pxToRem } from "./utils";

const ACTIVE_BORDER_WIDTH = 2;

const InputWrapDiv = styled.div<{
  themeColor: Theme.ColorName;
  fullWidth: boolean;
  $variant?: "outlined" | "contained";
  $hideBorder?: boolean;
}>`
  position: relative;
  border-radius: ${roundness(1)};
  line-height: 1em;
  border: none;
  display: flex;
  align-items: center;
  background-color: ${({ $variant, themeColor }) =>
    $variant === "contained" ? color(themeColor, 9) : color("gray", 0)};
  ${({ fullWidth }) => (fullWidth ? `width: 100%;` : "")}
  input::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  transition: border-with 0.2s, opacity 0.2s;

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
      border-color: ${color("gray", 15)};
      pointer-events: none;
      opacity: 0.4;
    }
  `}

  &[data-active="true"]:before {
    border-color: ${({ themeColor, $variant }) =>
      themeColor === "gray"
        ? color(themeColor, 15)
        : $variant === "contained"
        ? color("gray", 15)
        : color(themeColor, 6)};
    border-width: ${ACTIVE_BORDER_WIDTH}px;
    opacity: 1;
  }
  * {
    color: ${({ $variant, themeColor }) =>
      $variant === "contained"
        ? color(themeColor, 7, "text")
        : color("gray", 15)};
  }

  *::placeholder {
    opacity: 0.7;
    color: ${({ $variant, themeColor }) =>
      $variant === "contained"
        ? color(themeColor, 9, "text")
        : color("gray", 9)};
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

  interface Props extends React.HTMLProps<HTMLDivElement> {
    children: (props: ChildProps) => ReactChildren<string>;
    themeColor?: Theme.ColorName;
    customSize?: GenericProps.Size;
    fullWidth?: boolean;
    style?: CSSProperties;
    applyInputStylesToSelf?: boolean;
    active?: boolean;
    variant?: "outlined" | "contained";
    className?: string;
    hideBorder?: boolean;
  }
}

function getInputStyle(customSize: GenericProps.Size) {
  switch (customSize) {
    case "sm":
      return {
        minHeight: 35,
        fontSize: "1rem",
        padding: pxToRem(2, 9),
      };
    case "md":
      return {
        minHeight: 42,
        fontSize: "1.1rem",
        padding: pxToRem(2, 12),
      };
    case "lg":
      return {
        minHeight: 48,
        fontSize: "1.3rem",
        padding: pxToRem(2, 12),
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
      $hideBorder={hideBorder}
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
  );
}
