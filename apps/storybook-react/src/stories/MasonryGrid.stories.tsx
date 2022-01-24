import { color, MasonryGrid, Button } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";
import { useMemo } from "react";
import styled from "styled-components";

const BoxDiv = styled.div`
  display: flex;
  align-items: center;
`;

function Box({ index }: { index: number }) {
  const height = 50 * (index % 5) + 100;

  return (
    <BoxDiv
      style={{
        height,
        backgroundColor: color("gray", 15),
        color: color("gray", 15, "text"),
        width: "100%",
        padding: 10,
      }}
    >
      <Button>{index}</Button>
    </BoxDiv>
  );
}

function MasonryGridExample() {
  const children = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, i) => <Box key={i} index={i} />),
    []
  );

  return <MasonryGrid>{children}</MasonryGrid>;
}

const meta: Meta = {
  component: MasonryGridExample,
  title: "Layout/MasonryGrid",
};
export default meta;

export const BasicUsage = {
  args: {},
};
