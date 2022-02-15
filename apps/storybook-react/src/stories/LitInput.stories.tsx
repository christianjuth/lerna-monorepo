import { ComponentProps } from "react";
import { Input } from "@christianjuth/react-is-lit";
import { Meta, StoryObj } from "@storybook/react/types-6-0";

const meta: Meta = { component: Input, title: "Lit/Input" };
export default meta;

export const BasicUsage: StoryObj<ComponentProps<typeof Input>> = {
  args: {
    onKeyDown: (e) => e.stopPropagation(),
  },
};
