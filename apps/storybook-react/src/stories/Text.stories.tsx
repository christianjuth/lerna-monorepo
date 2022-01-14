import { Text } from "@christianjuth/ui";
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

export default { component: TextExamples };

export const BasicUsage = {};
