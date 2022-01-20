import { Text } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

function TextExamples() {
  return (
    <FlexColumn>
      {Text.variants.map((variant) => (
        <Text variant={variant} key={variant}>
          {variant}
        </Text>
      ))}
    </FlexColumn>
  );
}

const meta: Meta = { component: TextExamples, title: "Atoms/TextExamples" };
export default meta;

export const BasicUsage = {};
