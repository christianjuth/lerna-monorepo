import styled from "styled-components";
import { Text, Theme, color } from "@christianjuth/ui";

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
                color: color(themeColor, i, 'text'),
              }}
            >
              {i}
            </Box>
          ))}
      </div>
    </>
  );
}

function Tiles() {
  return (
    <>
      {COLORS.map((themeColor) => (
        <Palette key={themeColor} themeColor={themeColor} />
      ))}
    </>
  );
}

export default { component: Tiles };

export const BasicUsage = {};
