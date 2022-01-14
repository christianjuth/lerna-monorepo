import * as React from "react"
import { useCallback, useEffect } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import styled from "styled-components"
import { roundness, spacing, color, Theme } from "./Theme"
import { GenericProps, ReactChildren } from "./types"
import { pxToRem } from "./utils"
import { ControlledMenu, MenuItem, useMenuState } from "./Menu"
import { InputWrap } from "./InputWrap"
import { Checkbox } from './Checkbox'

export declare namespace MultiSelect {
  export type Size = GenericProps.Size
  export type Color = Theme.ColorName

  export type OptionType<T = string> = {
    label: string
    value: T
  }

  export interface Props<T = string> {
    title: string
    icon?: ReactChildren
    size?: Size
    color?: Color
    fullWidth?: boolean
    options: OptionType<T>[]
    onChange?: (selected: T[]) => any
    value?: T[]
  }
}

const MenuButton = styled.button<{
  size?: MultiSelect.Size
  color: MultiSelect.Color
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${roundness(2)}px;
  line-height: 1em;
  background-color: transparent;
  width: 100%;
  min-width: 195px;
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `
          font-size: 1rem;
          padding: ${pxToRem(9)};
        `
      case "md":
        return `
          font-size: 1.1rem;
          padding: ${pxToRem(12)};
        `
      case "lg":
        return `
          font-size: 1.3rem;
          padding: ${pxToRem(16)};
        `
    }
  }}
`

const IconWrap = styled.div`
  margin-right: 0.8ch;
  transform: translate(0, 1px);
`

const Option = styled.button<{
  themeColor: MultiSelect.Color
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${spacing(2)};
  background: transparent;
  margin: 0;
  border: none;
  font-size: 1.1rem;
  white-space: nowrap;
  &:not([disabled]) {
    cursor: pointer;
  }
  &[data-active="true"] {
    background-color: ${({ themeColor }) => color(themeColor, 1)};
    color: ${({ themeColor }) => color(themeColor, 1, 'text')};
  }
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

function useMultiSelectState(
  value: undefined | string[],
  onChange: ((selected: string[]) => any) | undefined
) {
  const [selected, setSelected] = React.useState<Record<string, boolean>>({})
  const numSelected = Object.values(selected).filter(Boolean).length

  React.useEffect(() => {
    if (!value) {
      return
    }

    const newSelected: Record<string, boolean> = {}

    value.forEach((item) => {
      newSelected[item as any] = true
    })

    setSelected(newSelected)
  }, [value])

  const toggleOption = useCallback((option: MultiSelect.OptionType) => {
    setSelected((oldSelected) => {
      const key = String(option.value)
      const clone = { ...oldSelected }

      if (clone[key]) {
        delete clone[key]
      } else {
        clone[key] = true
      }

      return clone
    })
  }, [])

  const selectedKeys = Object.keys(selected)
  useEffect(
    () => onChange?.(selectedKeys),
    // Since this is a shallow arr we can
    // generate a unique key with join
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedKeys.join()]
  )

  return {
    numSelected,
    selected,
    setSelected,
    toggleOption,
  }
}

export function MultiSelect({
  title,
  size = "md",
  color = "accent1",
  options,
  icon,
  value,
  onChange = undefined,
}: MultiSelect.Props) {
  const menuState = useMenuState()
  const { numSelected, selected, toggleOption } = useMultiSelectState(
    value,
    onChange
  )
  return (
    <>
      <ControlledMenu
        trigger={(props) => (
          <InputWrap active={menuState.open}>
            {(outlineProps) => (
              <MenuButton
                {...props}
                {...outlineProps}
                color={color}
                size={size}
              >
                <FlexRow>
                  {icon ? <IconWrap>{icon}</IconWrap> : null}
                  {title}
                  {numSelected ? ` (${numSelected})` : ""}
                </FlexRow>
                <AiFillCaretDown />
              </MenuButton>
            )}
          </InputWrap>
        )}
        {...menuState}
      >
        {options.map((option) => (
          <MenuItem key={option.value} id={option.value}>
            {({ props, ref, active }) => (
              <Option
                {...props}
                ref={ref}
                themeColor={color}
                onClick={() => toggleOption(option)}
                data-active={active}
              >
                <Checkbox
                  checked={selected[option.value + ""]}
                  style={{marginRight: spacing(1)}}
                  size="sm"
                />
                {option.label}
              </Option>
            )}
          </MenuItem>
        ))}
      </ControlledMenu>
    </>
  )
}

export function MultiSelectOptions({
  color = "accent1",
  options,
  value,
  onChange,
}: MultiSelect.Props) {
  const { selected, toggleOption } = useMultiSelectState(value, onChange)
  return (
    <>
      {options.map((option) => (
        <Option
          key={option.value}
          themeColor={color}
          onClick={() => toggleOption(option)}
        >
          <IconWrap>
            {selected[option.value + ""] ? (
              <MdCheckBox />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </IconWrap>
          {option.label}
        </Option>
      ))}
    </>
  )
}