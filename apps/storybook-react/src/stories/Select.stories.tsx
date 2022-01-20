import { Select } from "@christianjuth/ui";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react/types-6-0";
import { fireEvent, within, userEvent } from "@storybook/testing-library";

const options = ["One", "Two", "Three", "Four", "Five"];

function SelectExample() {
  return (
    <Select
      options={options.map((option) => ({
        label: option,
        value: option,
      }))}
    />
  );
}

const meta: Meta = { component: SelectExample, title: "Atoms/SelectExample" };
export default meta;

export const InitialState: StoryObj = {};

export const MouseInteraction: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const isOpen = async () =>
      (await canvas.queryAllByRole("option").length) > 0;

    await expect(await isOpen()).toBe(false);

    await fireEvent.click(await canvas.getByPlaceholderText("Select"));

    await expect(await isOpen()).toBe(true);

    const OPTION = options[1]
    await fireEvent.click(await canvas.getByText(OPTION));

    await expect(await isOpen()).toBe(false);

    const input = await canvas.getByRole('combobox') as HTMLInputElement
    await expect(input.value || input.placeholder).toBe(OPTION)
  },
};


export const KeyboardInteraction: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const getInput = async () => await canvas.getByRole('combobox') as HTMLInputElement

    const isOpen = async () =>
      (await canvas.queryAllByRole("option").length) > 0;

    await expect(await isOpen()).toBe(false);

    const i1 = await getInput()
    i1.focus()
    await userEvent.type(i1, "{space}", { skipClick: true })

    await expect(await isOpen()).toBe(true);

    const i2 = await getInput()
    const OPTION = options.slice(-1)[0]
    await userEvent.type(i2, `${OPTION}{enter}`, { skipClick: true })

    await expect(i2.value).toBe(OPTION)
  },
};
