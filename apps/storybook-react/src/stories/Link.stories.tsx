import { Link } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";

const meta: Meta = { component: Link, title: "Atoms/Link" };
export default meta;

export const BasicUsage = {
  args: {
    children: 'this is a test',
    href: '//google.com'
  }
};
