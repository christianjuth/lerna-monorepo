import { AlertProvider, useAlert } from "@christianjuth/ui";
import { StoryObj } from "@storybook/react/types-6-0";
import { fireEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const ALERT_CONTENT = "This is a test";
const TRIGGER_BTN_TEXT = "Trigger alert";
const CLOSE_BTN_TEXT = "Close";

function TriggerAlert() {
  const { dispatch } = useAlert();

  return (
    <button onClick={() => dispatch(ALERT_CONTENT)}>{TRIGGER_BTN_TEXT}</button>
  );
}

function AlertExample() {
  return (
    <AlertProvider>
      <TriggerAlert />
    </AlertProvider>
  );
}

export default { component: AlertExample };

export const BasicUsage: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(await canvas.queryAllByText(ALERT_CONTENT)).toHaveLength(0);

    await fireEvent.click(await canvas.getByText(TRIGGER_BTN_TEXT));

    await expect(await canvas.queryAllByText(ALERT_CONTENT)).toHaveLength(1);

    await fireEvent.click(await canvas.getByText(CLOSE_BTN_TEXT));

    await expect(await canvas.queryAllByText(ALERT_CONTENT)).toHaveLength(0);

    await fireEvent.click(await canvas.getByText(TRIGGER_BTN_TEXT));
  },
};
