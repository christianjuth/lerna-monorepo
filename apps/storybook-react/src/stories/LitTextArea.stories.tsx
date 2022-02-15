import { TextArea } from "@christianjuth/react-is-lit";
import { Meta, StoryObj } from "@storybook/react/types-6-0";
import { ComponentProps } from "react";

const meta: Meta = { component: TextArea, title: "Lit/TextArea" };
export default meta;

export const BasicUsage: StoryObj<ComponentProps<typeof TextArea>> = {
  args: {
    onKeyDown: (e) => e.stopPropagation(),
  },
};
