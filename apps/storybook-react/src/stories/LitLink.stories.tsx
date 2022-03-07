import { ComponentProps } from "react";
import { Link } from "@christianjuth/react-is-lit";
import { Meta, StoryObj } from "@storybook/react/types-6-0";

const meta: Meta = { component: Link, title: "Lit/Link" };
export default meta;

export const BasicUsage: StoryObj<ComponentProps<typeof Link>> = {
  args: {
    children: 'Testing'
  },
};