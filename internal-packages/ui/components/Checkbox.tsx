import { CSSProperties } from "react";
import styled from "styled-components";
import { color, roundness } from "./Theme";
import { GenericProps } from "./types";

const Box = styled.div<{ $size?: GenericProps.Size }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  input {
    position: absolute;
    cursor: pointer;
    height: 100%;
    width: 100%;
    margin: 0;
    border: none;
    background: none;
    appearance: none;
  }

  & > span {
    position: relative;
    display: block;
    ${({ $size }) => {
      let size = 25;
      switch ($size) {
        case "sm":
          size = 21;
          break;
        case "lg":
          size = 28;
      }

      return `
        height: ${size}px;
        width: ${size}px;
        min-width: ${size}px;
        min-height: ${size}px;
      `;
    }}
    pointer-events: none;
    border: 1px solid ${color("gray", 4)};
    border-radius: ${roundness(1)};
  }

  &:hover input ~ span {
    background-color: ${color("gray", 2)};
  }

  input:checked ~ span {
    background-color: ${color("accent1", 9)};
    border-color: ${color("accent1", 9)};
  }

  & > span:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
  }

  & > span:after {
    top: calc(50% - 8px);
    left: calc(50% - 4px);
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export const CheckboxSpacer = styled.div`
  height: 25px;
  width: 25px;
  min-width: 25px;
  min-height: 25px;
`;

type CheckboxProps = {
  style?: CSSProperties;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  size?: GenericProps.Size;
  id?: string;
  labelledBy?: string;
  name?: string;
};

export function Checkbox({
  style,
  checked,
  onChange,
  size,
  labelledBy,
  id,
  name,
}: CheckboxProps) {
  return (
    <Box style={style} $size={size} data-small-form-element>
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        id={id}
        aria-labelledby={labelledBy}
        name={name}
      />
      <span />
    </Box>
  );
}
