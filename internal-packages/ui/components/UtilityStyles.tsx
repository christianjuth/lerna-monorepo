import styled from "styled-components";
import { spacing } from "./Theme";

function numberToPx(val: number | string) {
  if (typeof val === "number") {
    return val + "px";
  }
  return val;
}

export const FlexRow = styled.div<{
  $spacing?: number;
  $centerContent?: "vertical" | "horizontal" | "both";
}>`
  display: flex;
  flex-direction: row;

  ${({ $spacing }) =>
    $spacing
      ? `
    &&& > *:not(:first-child) {
      margin-left: ${spacing($spacing)};
    }
  `
      : ""}

  ${({ $centerContent }) => {
    switch ($centerContent) {
      case "vertical":
        return "align-items: center;";
      case "horizontal":
        return "justify-content: center;";
      case "both":
        return `
          align-items: center;
          justify-content: center;
        `;
    }
  }}
`;

export const FlexCol = styled.div<{
  $spacing?: number;
  $centerContent?: "vertical" | "horizontal" | "both";
}>`
  display: flex;
  flex-direction: column;

  ${({ $spacing }) =>
    $spacing
      ? `
    &&& > *:not(:first-child) {
      margin-top: ${spacing($spacing)};
    }
  `
      : ""}

  ${({ $centerContent }) => {
    switch ($centerContent) {
      case "horizontal":
        return "align-items: center;";
      case "vertical":
        return "justify-content: center;";
      case "both":
        return `
              align-items: center;
              justify-content: center;
            `;
    }
  }}
`;

export const InvisibleButton = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
`;

export const SC = {
  FlexRow,
  FlexCol,
  InvisibleButton,
};
