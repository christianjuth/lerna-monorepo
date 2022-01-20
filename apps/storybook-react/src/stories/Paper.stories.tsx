import { Paper } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";

const meta: Meta = { component: Paper, title: "Atoms/Paper" };
export default meta;

export const BasicUsage = {
  args: {
    children:
      'Main content has a second level of indentation that you can disable with the "noPadding" prop',
  },
};