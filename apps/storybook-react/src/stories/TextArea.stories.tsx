import { TextArea } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";

const meta: Meta = { component: TextArea, title: "Atoms/TextArea" };
export default meta;

export const BasicUsage = {
  args: {
    style: {
      height: 200
    }
  }
};