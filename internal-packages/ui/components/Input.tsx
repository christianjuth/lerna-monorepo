import * as React from "react";
import { forwardRef } from "react";
import styled from "styled-components";
import { InputWrap } from "./InputWrap";
import { Theme } from "./Theme";
import { GenericProps } from "./types";

const InputStyle = styled.input`
  background: transparent;
`;

const inputFormats = {
  email: ["[A-Z0-9._%+-]+", "@", "[A-Z0-9.-]+", "\\.", "[A-Z]{2,}"],
};

export declare namespace Input {
  export type Size = GenericProps.Size;
  export type Color = Theme.ColorName;

  export interface Props
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: Size;
    fullWidth?: boolean;
    format?: keyof typeof inputFormats;
    labelledBy?: string;
    themeColor?: Color;
    placeholder?: string;
    variant?: "outlined" | "transparent";
    hideBorder?: boolean;
  }
}

function formatToRegex(format: string[]) {
  const revFormat = format.slice(0).reverse();
  const regStr = revFormat.reduce((prev, crnt) => `(${crnt}${prev}|)`, "");
  return new RegExp(`^${regStr}$`, "i");
}

export const Input = forwardRef<HTMLInputElement, Input.Props>(function Input(
  {
    size = "md",
    fullWidth = false,
    themeColor,
    format,
    onChange,
    labelledBy,
    style,
    variant,
    className,
    hideBorder,
    children,
    ...rest
  },
  ref
) {
  const regEx = React.useMemo(
    () => (format ? formatToRegex(inputFormats[format]) : null),
    [format]
  );

  return (
    <InputWrap
      customSize={size}
      themeColor={themeColor}
      fullWidth={fullWidth}
      style={style}
      variant={variant}
      className={className}
      hideBorder={hideBorder}
    >
      {(props) => (
        <InputStyle
          ref={ref}
          onChange={(e) => {
            if (!regEx || regEx.test(e.target.value)) {
              onChange?.(e);
            }
          }}
          aria-labelledby={labelledBy}
          {...rest}
          {...props}
          onFocus={(e) => {
            props.onFocus?.(e);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            props.onBlur?.(e);
            rest.onBlur?.(e);
          }}
        />
      )}
      <>
        {children}
      </>
    </InputWrap>
  );
});
