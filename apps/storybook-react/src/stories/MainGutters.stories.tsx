import { MainGutters } from "@christianjuth/ui";

export default { component: MainGutters };

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