import { Button } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";

const meta: Meta = { component: Button, title: "Atoms/Button" };
export default meta;

export const BasicUsage = {
  args: {
    children: "This is a test"
  }
};
