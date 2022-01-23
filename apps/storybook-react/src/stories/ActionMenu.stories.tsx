import { ActionMenu } from "@christianjuth/ui";
import { Meta, StoryObj } from "@storybook/react/types-6-0";

const meta: Meta = { component: ActionMenu, title: "Atoms/ActionMenu" };
export default meta;

export const BasicUsage: StoryObj<ActionMenu.Props> = {
  args: {
    items: [
      { button: { children: 'Click me' } },
      { link: { children: 'Click me' } }
    ],
    trigger: (props) => <button {...props}>Click me</button>,
  },
};
