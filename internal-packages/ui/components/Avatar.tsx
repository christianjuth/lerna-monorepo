import * as React from "react";
import styled from "styled-components";
import { color } from "./Theme";
import { GenericProps } from "./types";

export declare namespace Avatar {
  type Size = GenericProps.Size;

  export type Props = {
    className?: string;
    fullName: string;
    style?: React.CSSProperties;
    size?: Avatar.Size;
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const ProfileInitials = styled.div<{ size: Avatar.Size }>`
  border-radius: 50%;
  background-color: ${color("accent1", 9)};
  color: ${color("accent1", 9, "text")};
  text-align: center;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `
          height: 30px;
          width: 30px;
          line-height: 30px;
          font-size: 0.8rem;
        `;
      case "md":
        return `
          height: 38px;
          width: 38px;
          line-height: 38px;
          font-size: 1rem;
        `;
      case "lg":
        return `
          height: 45px;
          width: 45px;
          line-height: 45px;
          font-size: 1.5rem;
        `;
    }
  }}
`;

export function Avatar({
  className,
  fullName,
  style,
  size = "md",
}: Avatar.Props) {
  return (
    <ProfileInitials className={className} style={style} size={size}>
      {getInitials(fullName)}
    </ProfileInitials>
  );
}

export default Avatar;
