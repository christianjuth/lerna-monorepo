import styled from 'styled-components'
import { color } from './Theme'

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${color('gray', 3)};
  width: 100%;
`