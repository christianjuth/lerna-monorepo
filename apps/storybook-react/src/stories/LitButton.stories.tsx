import { Button } from "@christianjuth/react-is-lit";
import { Meta } from "@storybook/react/types-6-0";

const meta: Meta = { component: Button, title: "Lit/Button" };
export default meta;

export const BasicUsage = {
  args: {
    children: "Click me"
  },
};
