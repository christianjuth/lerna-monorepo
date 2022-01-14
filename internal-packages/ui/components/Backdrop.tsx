import styled from "styled-components";
import { zIndex } from "./Theme";
import { ReactChildren } from "./types";
import { useRef } from "react";

export const BackdropStyle = styled.div<{
  $visible: boolean;
}>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndex("header", 10)};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(28 28 28 / 60%);
  ${({ $visible }) => (!$visible ? "display: none;" : "")}
`;

export function Backdrop({
  children,
  visible,
  handleClose
}: {
  children: ReactChildren;
  visible: boolean;
  handleClose?: () => any
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <BackdropStyle 
      ref={ref} 
      $visible={visible}
      onClick={e => {
        if (e.target === ref.current) {
          handleClose?.()
        }
      }}
    >
      {children}
    </BackdropStyle>
  );
}
