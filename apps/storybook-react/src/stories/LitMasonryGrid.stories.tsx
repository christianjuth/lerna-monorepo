import { MasonryGrid, MasonryGridItem } from "@christianjuth/react-is-lit";
import { Meta } from "@storybook/react/types-6-0";

import styled from "styled-components";

const BoxDiv = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  box-sizing: border-box;
`;

function Box({ index, children }: { index: number; children: any }) {
  const height = 50 * (index % 5) + 100;

  return (
    <BoxDiv
      style={{
        height,
        backgroundColor: "white",
        color: "black",
        width: "100%",
        padding: 10,
      }}
    >
      {children}
    </BoxDiv>
  );
}

function MasonryGridExample() {
  return (
    <MasonryGrid cols={3} spacing={1}>
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <MasonryGridItem key={i}>
            <Box index={i}>
              <button>Testing</button>
            </Box>
          </MasonryGridItem>
        ))}
    </MasonryGrid>
  );
}

const meta: Meta = { component: MasonryGridExample, title: "Lit/MasonryGrid" };
export default meta;

export const BasicUsage = {
  args: {},
};
