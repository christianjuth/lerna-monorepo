import { useEffect, useState, Dispatch, SetStateAction, useMemo } from "react"
import { FiChevronDown } from "react-icons/fi"
import styled from "styled-components"
import { color, spacing, Theme } from "./Theme"
import { GenericProps } from "./types"
import { Menu, ControlledMenu, MenuItem, useMenuState } from "./Menu"
import { InputWrap } from "./InputWrap"
import { useRef } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"

export declare namespace Select {
  export type Size = GenericProps.Size
  export type Color = Theme.ColorName

  export type OptionType<T> = {
    label: string
    value: T
  }

  export interface Props<T> extends Omit<Menu.Props, "children" | "trigger"> {
    options?: Select.OptionType<T>[]
    onChange?: (val?: Select.OptionType<T> | null) => any
    value?: T
    placeholder?: string
    themeColor?: Color
    size?: Select.Size
    htmlAutoComplete?: string
    handleHtmlAutoComplete?: (value: string) => T | undefined
    enableAutoComplete?: boolean
    popupPlacement?: Menu.PopupPlacement
    labelledBy?: string
    id?: string
  }

  interface UseSelectState<T> extends ReturnType<typeof useMenuState> {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    selected: OptionType<T> | null
    setSelected: Dispatch<SetStateAction<OptionType<T> | null>>
  }

  interface StatelessSelectProps<T> extends Props<T> {
    selectState: UseSelectState<T>
  }
}

const MenuButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  svg {
    position: absolute;
    right: 10px;
    pointer-events: none;
  }
`

const StyledInput = styled.input`
  width: 100%;
  cursor: default;
  background: ${color('gray', 0)};
  &[data-open="false"] {
    caret-color: transparent;
  }
  &[data-has-selection="true"]::placeholder {
    color: ${color('gray', 15)} !important;
  }
`

const Option = styled.div<{ themeColor: Select.Color }>`
  display: flex;
  padding: ${spacing(2)};
  background: transparent;
  margin: 0;
  border: none;
  font-size: 1.1rem;
  white-space: nowrap;
  color: ${color('gray', 15)};
  :hover,
  &[data-active="true"] {
    background-color: ${({ themeColor }) => color(themeColor, 1)};
    color: ${({ themeColor }) => color(themeColor, 1, 'text')};
  }
  &[data-selected="true"] {
    background-color: ${({ themeColor }) => color(themeColor, 5)};
    color: ${({ themeColor }) => color(themeColor, 5, "text")};
  }
`

function getOptionByValue<T>(options?: Select.OptionType<T>[], value?: T) {
  return value
    ? options?.find((option) => option.value === value) ?? null
    : null
}

export function useSelectState<T>(): Select.UseSelectState<T> {
  const menuState = useMenuState()
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Select.OptionType<T> | null>(null)

  return {
    ...menuState,
    search,
    setSearch,
    selected,
    setSelected,
  }
}

export function StatelessSelect<T extends string | number>({
  options,
  themeColor = "accent1",
  size = "md",
  placeholder = "Select",
  value,
  onChange,
  htmlAutoComplete = "disabled",
  handleHtmlAutoComplete,
  enableAutoComplete = true,
  popupPlacement,
  selectState,
  id,
  labelledBy,
  ...rest
}: Select.StatelessSelectProps<T>) {
  const { search, setSearch, selected, setSelected, ...menuState } = selectState
  const { open, toggle, activeId } = menuState

  const [autoCompleteSearch, setAutoCompleteSearch] = useState("")

  const [autoCompleteTempDisabled, setAutoCompleteTempDisabled] = useState(
    enableAutoComplete
  )

  const filteredOptions = useMemo(
    () =>
      options?.filter(
        (option) =>
          String(option.label)
            .toLowerCase()
            .replace(/\s+/g, "")
            .indexOf(search.toLowerCase().replace(/\s+/g, "")) === 0
      ) ?? [],
    [options, search]
  )

  useEffect(() => {
    setSearch("")
    setAutoCompleteSearch("")
  }, [open, setSearch])

  // Allow parent element to control value
  useDeepCompareEffect(() => {
    setSelected(getOptionByValue<T>(options, value))
  }, [options, value, setSelected])

  // Notify parent when selcted changes
  useEffect(
    () => {
      onChange?.(selected)
      setAutoCompleteSearch("")
    },
    // Value should be a unique key any option
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected?.value]
  )

  // Auto complete
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const elm = inputRef.current
    const autoCompleteEnabled = enableAutoComplete && !autoCompleteTempDisabled
    if (elm && activeId && search.length > 0 && autoCompleteEnabled) {
      const option = getOptionByValue<T>(filteredOptions, activeId as any)
      if (open) {
        // Suggest autocomplete option
        option && setAutoCompleteSearch(option?.label)
      } else {
        // Auto select active element on close
        option && setSelected(option)
      }
    }
  }, [
    open,
    activeId,
    filteredOptions,
    search,
    autoCompleteTempDisabled,
    enableAutoComplete,
    setSelected,
  ])

  // Selecting the auto completed text allows the
  // user to overwrite it as they continue to type
  useEffect(() => {
    const elm = inputRef.current
    if (elm && search.length > 0 && autoCompleteSearch.length > search.length) {
      elm.setSelectionRange(search.length, autoCompleteSearch.length)
    }
  }, [search, autoCompleteSearch])

  return (
    <ControlledMenu
      {...menuState}
      popupPlacement={popupPlacement}
      trigger={(props) => (
        <MenuButton>
          <InputWrap
            themeColor={themeColor}
            customSize={size}
            // Forcing a rerender clears the background
            // color from autoComplete data
            key={selected?.value}
          >
            {(inputProps) => (
              <>
                <StyledInput
                  {...props}
                  {...inputProps}
                  onBlur={(e) => {
                    inputProps.onBlur(e)
                    props.onBlur(e)
                  }}
                  placeholder={selected?.label ?? placeholder}
                  onChange={(e) => {
                    setAutoCompleteSearch("")
                    // Try to detect autocomplete
                    if (e.nativeEvent instanceof InputEvent) {
                      setSearch(e.target.value)
                      setAutoCompleteTempDisabled(!e.nativeEvent.data)
                    } else if (e.target.value) {
                      const newValue = handleHtmlAutoComplete?.(e.target.value)
                      if (newValue) {
                        toggle(false)
                        setSelected(getOptionByValue(options, newValue))
                      }
                    }
                  }}
                  value={
                    autoCompleteTempDisabled
                      ? search
                      : autoCompleteSearch || search
                  }
                  autoComplete={htmlAutoComplete}
                  data-open={menuState.open}
                  data-has-selection={Boolean(selected)}
                  aria-autocomplete={enableAutoComplete ? "none" : "both"}
                  ref={inputRef}
                  type="text"
                  title={
                    menuState.open ? "search select options" : "open select"
                  }
                  id={id}
                  aria-labelledby={labelledBy}
                />
                <FiChevronDown size="1.4rem" />
              </>
            )}
          </InputWrap>
        </MenuButton>
      )}
      {...rest}
    >
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option) => (
          <MenuItem key={option.value} id={option.value}>
            {({ active, props, ref }) => (
              <Option
                {...props}
                onClick={() => {
                  setSelected(option)
                  toggle(false)
                }}
                themeColor={themeColor}
                ref={ref}
                aria-selected={selected?.value === option.value}
                data-active={active}
                data-selected={selected?.value === option.value}
              >
                {option.label}
              </Option>
            )}
          </MenuItem>
        ))
      ) : (
        <Option themeColor={themeColor}>No options</Option>
      )}
    </ControlledMenu>
  )
}

export function Select<T extends string | number>(props: Select.Props<T>) {
  const selectState = useSelectState<T>()
  return <StatelessSelect<T> {...props} selectState={selectState} />
}