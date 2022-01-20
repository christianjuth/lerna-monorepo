import { InputWrap } from "./InputWrap";
import styled from "styled-components";
import { TextareaHTMLAttributes, forwardRef } from "react";
import { spacing, Theme } from "./Theme";
import { GenericProps } from "./types";

const TextAreaElm = styled.textarea`
  resize: none;
  background: transparent;
`;

export declare namespace TextArea {
  export type Size = GenericProps.Size;
  export type Color = Theme.ColorName;

  export interface Props
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
    size?: Size;
    fullWidth?: boolean;
    labelledBy?: string;
    themeColor?: Color;
    placeholder?: string;
  }
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextArea.Props>(
  function TextArea({ style, size, ...rest }, ref) {
    return (
      <InputWrap customSize={size} style={{ alignItems: "stretch", ...style }}>
        {(props) => (
          <TextAreaElm
            {...props}
            {...rest}
            style={{
              ...props.style,
              padding: spacing(2),
              height: "unset",
            }}
            onBlur={(e) => {
              props.onBlur(e);
              rest.onBlur?.(e);
            }}
            onFocus={(e) => {
              props.onFocus(e);
              rest.onFocus?.(e);
            }}
            ref={ref}
          />
        )}
      </InputWrap>
    );
  }
);
