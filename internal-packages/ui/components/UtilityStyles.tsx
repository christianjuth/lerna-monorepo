import styled from "styled-components";

function numberToPx(val: number | string) {
  if (typeof val === "number") {
    return val + "px";
  }
  return val;
}

export const FlexRow = styled.div<{ $spacing?: number | string }>`
  display: flex;
  flex-direction: row;

  ${({ $spacing }) =>
    $spacing
      ? `
    & > *:not(:first-child) {
      margin-left: ${numberToPx($spacing)};
    }
  `
      : ""}
`;

export const FlexCol = styled.div<{ $spacing?: number }>`
  display: flex;
  flex-direction: column;
`;

export const InvisibleButton = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
`;
