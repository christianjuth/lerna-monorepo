import { Select } from "@christianjuth/react-is-lit";
import { Meta, StoryObj } from "@storybook/react/types-6-0";
import { ComponentProps } from "react";

const meta: Meta = { component: Select, title: "Lit/Select" };
export default meta;

export const BasicUsage: StoryObj<ComponentProps<typeof Select>> = {
  args: {
    options: [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 }
    ],
    onKeyDown: (e) => e.stopPropagation(),
  },
};