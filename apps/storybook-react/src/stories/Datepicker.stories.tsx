import { Datepicker, useDatepickerState } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";

function DatepickerExample() {
  const state = useDatepickerState()
  return (
    <Datepicker {...state} />
  )
}

const meta: Meta = { component: DatepickerExample, title: "Atoms/Datepicker" };
export default meta;

export const BasicUsage = {};