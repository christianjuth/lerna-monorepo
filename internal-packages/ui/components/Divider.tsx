import styled from "styled-components";
import { theme } from "./Theme";

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${theme.colorPresets.border};
  width: 100%;
`;
