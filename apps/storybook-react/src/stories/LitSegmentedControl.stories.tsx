import { SegmentedControl } from "@christianjuth/react-is-lit";
import { Meta, StoryObj } from "@storybook/react/types-6-0";
import { ComponentProps } from "react";

const meta: Meta = { component: SegmentedControl, title: "Lit/SegmentedControl" };
export default meta;

export const BasicUsage: StoryObj<ComponentProps<typeof SegmentedControl>> = {
  args: {
    options: [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 }
    ]
  },
};