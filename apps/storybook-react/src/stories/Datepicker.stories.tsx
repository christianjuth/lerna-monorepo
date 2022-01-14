import { Datepicker, useDatepickerState } from "@christianjuth/ui";

function DatepickerExample() {
  const state = useDatepickerState()
  return (
    <Datepicker {...state} />
  )
}

export default { component: DatepickerExample };

export const BasicUsage = {};