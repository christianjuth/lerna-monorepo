import {
  Button, color, ReactChildren, roundness, spacing, Text,
  Theme
} from "@christianjuth/ui";
import { Fragment, useState } from "react";
import styled from "styled-components";
import { baseTheme, darkTheme } from "../config/theme";

const COLORS: Theme.ColorName[] = ["primary", "accent1", "gray"];

const Title = styled(Text)`
  display: block;
  width: 100%;
  margin-top: 10px;
`;

const Box = styled.div`
  height: 100px;
  padding: 10px;
  flex: 1;
`;

function Palette({ themeColor }: { themeColor: Theme.ColorName }) {
  return (
    <>
      <Title variant="h5">{color}</Title>
      <div style={{ display: "flex" }}>
        {Array(16)
          .fill(0)
          .map((_, i) => (
            <Box
              key={themeColor}
              style={{
                backgroundColor: color(themeColor, i),
                color: color(themeColor, i, "text"),
              }}
            >
              {i}
            </Box>
          ))}
      </div>
    </>
  );
}

function ThemeExample({
  useDarkTheme,
  children,
}: {
  useDarkTheme: boolean;
  children?: ReactChildren;
}) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: roundness(1),
        overflow: "hidden",
      }}
    >
      <Theme
        baseTheme={baseTheme}
        darkTheme={darkTheme}
        useDarkTheme={useDarkTheme}
      >
        <div style={{ padding: spacing(3) }}>
          {children}
          {COLORS.map((themeColor) => (
            <Fragment key={themeColor}>
              <Text variant="copy-1">{themeColor}</Text>
              <Palette themeColor={themeColor} />
            </Fragment>
          ))}
        </div>
      </Theme>
    </div>
  );
}

export function LightTheme() {
  return <ThemeExample useDarkTheme={false} />;
}

export function DarkTheme() {
  return <ThemeExample useDarkTheme={true} />;
}

export function DynamicTheme() {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeExample useDarkTheme={isDark}>
      <Button onClick={() => setIsDark((v) => !v)}>
        Use {isDark ? "light" : "dark"} theme
      </Button>
      <br />
    </ThemeExample>
  );
}
