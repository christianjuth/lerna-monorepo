import styled from "styled-components";
import { color } from '@christianjuth/ui'

export const Box = styled.div`
  background-color: ${color('primary', 8)};
  border: 1px solid ${color('primary', 11)};
  color: ${color('primary', 8, 'text')};
  min-height: 50px;
  text-align: center;
  line-height: 50px;
`