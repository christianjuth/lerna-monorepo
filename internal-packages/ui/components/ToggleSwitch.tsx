import * as React from "react"
import styled from "styled-components"
import { color } from "./Theme"

const Switch = styled.button<{
  active: boolean
}>`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  border: none;
  background-color: ${color("gray", 2)};
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.2s;
  :before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
  }
  ${({ active }) =>
    active
      ? `
    background-color: ${color("accent1", 5)};
    :before {
      transform: translateX(26px);
    }
  `
      : ""}
`

export function ToggleSwitch({
  id,
  labelledBy,
  value,
  onChange,
  defaultValue = false,
}: {
  id?: string
  labelledBy?: string
  value?: boolean
  onChange?: (val: boolean) => any
  defaultValue?: boolean
}) {
  const [checked, setChecked] = React.useState(defaultValue)

  // allow props to override state
  const computedValue = value ?? checked
  const handleChange = onChange ?? setChecked

  return (
    <Switch
      id={id}
      role="switch"
      aria-checked={value}
      aria-labelledby={labelledBy}
      onClick={() => {
        if (handleChange) {
          handleChange(!computedValue)
        }
      }}
      active={computedValue}
    />
  )
}