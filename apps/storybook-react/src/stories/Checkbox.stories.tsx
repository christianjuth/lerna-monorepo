import { Checkbox } from "@christianjuth/ui";
import { StoryObj, Meta } from "@storybook/react/types-6-0";
import { fireEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta = { component: Checkbox, title: "Atoms/Checkbox" };
export default meta;

export const BasicUsage: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = (await canvas.getByRole("checkbox")) as HTMLInputElement;

    await expect(checkbox.checked).toBe(false);

    await fireEvent.click(checkbox);

    await expect(checkbox.checked).toBe(true);

    await fireEvent.click(checkbox);

    await expect(checkbox.checked).toBe(false);
  },
};
