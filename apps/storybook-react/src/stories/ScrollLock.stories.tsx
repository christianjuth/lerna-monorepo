import { Button, FlexCol, ScrollLock, Text, theme } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";
import { useState } from "react";

function ScrollLockExample() {
  const [active, setActive] = useState(false);

  return (
    <FlexCol>
      <ScrollLock active={active} />
      <Button onClick={() => setActive((b) => !b)}>
        {active ? "Disable" : "Enable"} scroll lock
      </Button>
      <br />
      <Text variant='copy-1'>Use box below to measure layout shift</Text>
      <div
        style={{ height: "200vh", width: "100%", backgroundColor: theme.color('gray', 2) }}
      />
    </FlexCol>
  );
}

const meta: Meta = { component: ScrollLockExample, title: "Atoms/ScrollLock" };
export default meta;

export const BasicUsage = {
  args: {},
};
