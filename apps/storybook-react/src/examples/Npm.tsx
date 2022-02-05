import {
  Divider,
  Grid,
  MainGutters,
  Navbar,
  Paper,
  SC,
  spacing,
  Text,
  theme,
  Theme,
} from "@christianjuth/ui";
import { BiSearch } from "react-icons/bi";
import { FaFire, FaNpm } from "react-icons/fa";
import { ImHeart } from "react-icons/im";
import { RiNumbersFill } from "react-icons/ri";
import { useDarkMode } from "storybook-dark-mode";
import styled from "styled-components";

const DiscoverBtn = styled.button<{ $index: number }>`
  border: 1px solid ${theme.colorPresets.border};
  border-bottom-width: 2px;
  background: transparent;
  color: ${theme.colorPresets.text};
  padding: ${theme.spacing(3.5)};
  font-size: 1.2rem;
  transition: all 0.1s;
  cursor: pointer;

  :hover {
    background-color: hsla(
      ${({ $index }) => $index * (360 / 12)}deg,
      80%,
      40%,
      0.4
    );
    border-color: transparent;
    border-bottom-color: hsl(
      ${({ $index }) => $index * (360 / 12)}deg,
      80%,
      40%
    );
  }
`;

const ColorBar = styled.div`
  border-width: 10px 0 0;
  border-top-style: solid;
  border-image: linear-gradient(
      139deg,
      hsl(30deg 97% 54%),
      #ff4b01,
      #c12127,
      hsl(291deg 100% 58%)
    )
    3;
`;

const ColorDivider = styled.hr<{ $color: "red" | "yellow" | "orange" }>`
  border: 1px solid
    ${({ $color }) => {
      switch ($color) {
        case "red":
          return "#EA2039";
        case "yellow":
          return "#FEE933";
        case "orange":
          return "#FAB231";
      }
    }};
  width: 100%;
`;

export function Npm() {
  const darkMode = useDarkMode();

  return (
    <Theme
      baseTheme={{
        primary: ({ l }) => [0, 0, l],
        accent1: ({ l }) => [0, 0, l],
        gray: ({ l, shade }) => [218, shade / 2, l],
      }}
      darkTheme={{
        gray: ({ l, shade }) => [218, 8 - shade / 2, 100 - l],
      }}
      useDarkTheme={darkMode}
      roundness={0}
      button={{
        fontStyle: "normal",
      }}
      mainGutters={{
        baseWidth: "1000px",
      }}
    >
      <ColorBar />
      <Navbar
        logo={
          <SC.FlexRow $centerContent="vertical" $spacing={2}>
            <ImHeart />
            <Text variant="copy-2" noPadding>
              Need Public Method
            </Text>
          </SC.FlexRow>
        }
        rightItems={[
          { link: { children: "Products" } },
          { link: { children: "Pricing" } },
          { link: { children: "Documentation" } },
          { link: { children: "Community" } },
        ]}
        elevation={5}
      />
      <Navbar
        logo={
          <FaNpm
            size={50}
            style={{ marginTop: 3 }}
            color={theme.colorPresets.text}
          />
        }
        centerItem={{ search: { showButton: true, themeColor: "gray" } }}
        rightItems={[
          {
            avatar: { fullName: "Jon Doe" },
          },
        ]}
        defaultButtonVariant="contained"
        defaultItemSize="lg"
        elevation={5}
      />
      <MainGutters innerStyle={{ paddingTop: spacing(2) }}>
        <Paper padding={4} elevation={4}>
          <Grid.Row cols={6} spacing={spacing(4)}>
            <Grid.Col xs={6} md={3} xl={2}>
              <Text variant="h6">
                <FaFire style={{ transform: "translate(0, 0.15em)" }} /> Popular
                libraries
              </Text>
              <ColorDivider $color="red" />

              {[
                "lodash",
                "react",
                "chalk",
                "tslib",
                "axios",
                "commander",
                "express",
                "react-dom",
                "moment",
                "request",
              ].map((pkg) => (
                <>
                  <Text variant="copy-1" noPadding>
                    {pkg}
                  </Text>
                  <Divider />
                </>
              ))}
            </Grid.Col>

            <Grid.Col xs={6} md={3} xl={2}>
              <Text variant="h6">
                <BiSearch style={{ transform: "translate(0, 0.15em)" }} />{" "}
                Discover packages
              </Text>
              <ColorDivider $color="yellow" />

              <Grid.Row cols={6} spacing={spacing(2)}>
                {(
                  [
                    ["Front-end", 3],
                    ["Back-end", 3],
                    ["CLI", 3],
                    ["Documentation", 3],
                    ["CSS", 2],
                    ["Testing", 2],
                    ["IoT", 2],
                    ["Coverage", 3],
                    ["Mobile", 3],
                    ["Frameworks", 3],
                    ["Robotics", 3],
                    ["Math", 6],
                  ] as const
                ).map(([text, cols], i) => (
                  <Grid.Col key={text} xs={cols}>
                    <DiscoverBtn $index={i}>{text}</DiscoverBtn>
                  </Grid.Col>
                ))}
              </Grid.Row>
            </Grid.Col>

            <Grid.Col xs={6} md={3} xl={2}>
              <Text variant="h6">
                <RiNumbersFill style={{ transform: "translate(0, 0.15em)" }} />{" "}
                By the numbers
              </Text>
              <ColorDivider $color="orange" />

              <Text variant="copy-2">Packages</Text>
              <Text variant="h6">1,856,883</Text>
              <Divider />
              <Text variant="copy-2">Downloads · Last Week</Text>
              <Text variant="h6">39,718,534,503</Text>
              <Divider />
              <Text variant="copy-2">Downloads · Last Month</Text>
              <Text variant="h6">138,628,361,864</Text>
            </Grid.Col>
          </Grid.Row>
        </Paper>
      </MainGutters>
    </Theme>
  );
}
