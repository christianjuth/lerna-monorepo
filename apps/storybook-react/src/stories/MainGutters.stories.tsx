import { MainGutters } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";

const meta: Meta = { component: MainGutters, title: "Layout/MainGutters" };
export default meta;

export const BasicUsage = {
  args: {
    innerStyle: {
      backgroundColor: "#777",
      minHeight: 300,
      color: "#fff",
    },
    style: {
      backgroundColor: "#aaa",
    },
    children:
      'Main content has a second level of indentation that you can disable with the "noPadding" prop',
  },
};