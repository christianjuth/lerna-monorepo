import { useCallback, useEffect } from "react"
import { useState } from "react"
import { InputWrap } from "./InputWrap"
import dayjs from "dayjs"
import styled from "styled-components"
import { BsFillCalendarFill } from "react-icons/bs"
import { mediaQuery } from "./Grid/utils"
import { spacing, color } from './Theme'

const HTML_DATE_PROP_FORMAT = "YYYY-MM-DD"

function useLocaleDateFormat() {
  const [format, setFormat] = useState("MM/DD/YYYY")

  useEffect(() => {
    const dayjsObj = dayjs("12/11/2000")
    if (dayjsObj.isValid()) {
      const locale = dayjsObj.toDate().toLocaleDateString()
      const monthFirst = locale.indexOf("12") === 0
      setFormat(monthFirst ? "MM/DD/YYYY" : "DD/MM/YYYY")
    }
  }, [])

  return format
}

const InputStyle = styled.input`
  background: transparent;
`

const CalendarButtonWrap = styled.div`
  position: relative;
  padding: ${spacing(0, 2.5)};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media ${mediaQuery("xs", "md")} {
    width: 100%;
  }
`

// Trigger calendar when user clicks on input in chrome
// See https://stackoverflow.com/a/65138737/3052484
const CalendarInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-width: 0;
  border: none;
  padding: 0;
  color: transparent;
  opacity: 0;
  ::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    color: transparent;
    display: flex;
  }
  cursor: pointer;
`

declare namespace Datepicker {
  type Date = dayjs.Dayjs
  type DateProp = Date | string
}

function convertStringToDateIfNeeded(
  date: string | Datepicker.Date | undefined
) {
  if (typeof date === "string") {
    return dayjs(date)
  }
  return date
}

export function useDatepickerState(config?: {
  defaultDate?: Datepicker.DateProp
  min?: Datepicker.DateProp
  max?: Datepicker.DateProp
}) {
  const { defaultDate, min, max } = config ?? {}
  const [date, setDate] = useState<Datepicker.Date | undefined>(
    convertStringToDateIfNeeded(defaultDate)
  )

  const update = useCallback(
    ({ date }: { date?: Datepicker.DateProp }) => {
      if (date) {
        date = convertStringToDateIfNeeded(date)!
        const parsedMin = convertStringToDateIfNeeded(min)
        const parsedMax = convertStringToDateIfNeeded(max)

        if (parsedMin && date.isBefore(parsedMin)) {
          setDate(parsedMin)
        } else if (parsedMax && date.isAfter(parsedMax)) {
          setDate(parsedMax)
        } else {
          setDate(date)
        }
      }
    },
    [min, max]
  )

  return {
    date,
    update,
    min: convertStringToDateIfNeeded(min),
    max: convertStringToDateIfNeeded(max),
  }
}

export function Datepicker({
  date,
  update,
  min,
  max,
}: ReturnType<typeof useDatepickerState>) {
  const [freeFormValue, setFreeFormValue] = useState("")
  const dateFormat = useLocaleDateFormat()

  useEffect(() => {
    if (date) {
      setFreeFormValue(date.format(dateFormat))
    }
  }, [date, dateFormat])

  function updateDate(val: string) {
    // convert hyphens in date to slash
    if (val.indexOf("-") !== -1) {
      val = val.replaceAll("-", "/")
    }
    // add slashes to date if they are missing
    else if (val.indexOf("/") === -1) {
      val = val
        .split("")
        .map((char, i) => {
          if (i % 2 === 1 && i < 5) {
            return char + "/"
          } else {
            return char
          }
        })
        .join("")
    }

    const parsedDate = dayjs(val)
    if (parsedDate.isValid()) {
      update({ date: parsedDate })
    }
  }

  return (
    <InputWrap>
      {(props) => (
        <>
          <InputStyle
            {...props}
            value={freeFormValue}
            onChange={(e) => setFreeFormValue(e.target.value)}
            placeholder={dateFormat.toLowerCase()}
            onBlur={() => {
              updateDate(freeFormValue)
              props.onBlur()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateDate(freeFormValue)
              }
            }}
          />
          <CalendarButtonWrap>
            <CalendarInput
              type="date"
              value={date?.format(HTML_DATE_PROP_FORMAT) ?? ""}
              min={min?.format(HTML_DATE_PROP_FORMAT)}
              max={max?.format(HTML_DATE_PROP_FORMAT)}
              onChange={(e) => {
                update({ date: dayjs(e.target.value) })
              }}
            />
            <BsFillCalendarFill 
              size={20} 
              fill={color('gray', 4)}
            />
          </CalendarButtonWrap>
        </>
      )}
    </InputWrap>
  )
}

export default Datepicker