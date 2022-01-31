import styled from "styled-components";
import { theme } from "./Theme";

interface DividerProps {
  style?: React.CSSProperties;
  className?: string;
  vertical?: boolean;
}

const HorizontalDivider = styled.hr`
  height: 1px;
  width: 100%;
  border: none;
  background-color: ${theme.colorPresets.border};
`;

const VerticleDivider = styled.div`
  height: 100%;
  min-height: 100%;
  width: 1px;
  background-color: ${theme.colorPresets.border};
  border: none;
  padding: 0;
  margin: 0;
`;

export function Divider({
  style,
  className,
  vertical,
  ...cssProps
}: DividerProps) {
  return (
    <>
      {vertical ? (
        <VerticleDivider
          className={className}
          style={style}
          aria-label="Vertical separator"
        />
      ) : (
        <HorizontalDivider
          style={{
            ...cssProps,
            ...style,
          }}
          className={className}
        />
      )}
    </>
  );
}
