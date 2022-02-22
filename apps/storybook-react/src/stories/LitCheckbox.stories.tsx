import { ComponentProps } from 'react'
import { Checkbox } from "@christianjuth/react-is-lit";
import { Meta, StoryObj } from "@storybook/react/types-6-0";

const meta: Meta = { component: Checkbox, title: "Lit/Checkbox" };
export default meta;

export const BasicUsage: StoryObj<ComponentProps<typeof Checkbox>> = {
  args: {
    onChange: (e) => console.log(e.target.checked)
  },
};
