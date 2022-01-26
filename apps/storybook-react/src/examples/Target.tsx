import {
  MainGutters,
  Navbar,
  spacing,
  Theme,
  Grid,
  theme,
} from "@christianjuth/ui";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosCart } from "react-icons/io";
import { SiTarget } from "react-icons/si";
import { useDarkMode } from "storybook-dark-mode";
import { Palette } from "../organisms/Theme";

export function Target() {
  const darkMode = useDarkMode();

  return (
    <Theme
      baseTheme={{
        primary: ({ l }) => [0, 100, l],
        accent1: ({ l }) => [0, 0, l],
        gray: ({ l, shade }) => [218, shade + 10, l],
      }}
      darkTheme={{
        gray: ({ l, shade }) => [218, 25 - shade, 100 - l],
      }}
      useDarkTheme={darkMode}
      roundness={22}
      mainGutters={{
        baseWidth: "1100px",
      }}
      button={{
        fontStyle: "normal",
      }}
    >
      <Navbar
        themeColor="primary"
        themeShade={11}
        defaultItemSize="md"
        defaultButtonVariant="transparent"
        logo={<SiTarget size={35} style={{ marginTop: 3 }} />}
        leftItems={[
          { link: { children: "Categories" } },
          { link: { children: "Deals" } },
          { link: { children: "What's New" } },
          { link: { children: "Pickup & Delivery" } },
        ]}
        centerItem={{ search: { variant: "outlined" } }}
        rightItems={[
          {
            button: {
              children: <BsPersonCircle size={26} />,
            },
          },
          {
            button: {
              children: <IoIosCart size={26} />,
            },
          },
        ]}
      />
      <Navbar
        rightItems={[
          { link: { children: "Registry" } },
          { link: { children: "Weekly Ad" } },
          { link: { children: "RedCard" } },
          { link: { children: "Gift Cards" } },
          { link: { children: "Find Stores" } },
          { link: { children: "Orders" } },
          { link: { children: "More" } },
        ]}
      />
      <MainGutters maxWidth={1000}>
        <Grid.Row cols={12}>
          <Grid.Col
            xs={12}
            md={6}
            style={{ aspectRatio: "1", backgroundColor: "#f8cc46" }}
          />

          <Grid.Col
            xs={0}
            md={3}
            style={{ aspectRatio: "1/2", backgroundColor: "#f16aae" }}
          />
          <Grid.Col
            xs={4}
            md={0}
            style={{ aspectRatio: "1", backgroundColor: "#f16aae" }}
          />

          {/* Desktop */}
          <Grid.Col xs={0} md={3}>
            <div
              style={{
                aspectRatio: "1",
                backgroundColor: theme.color("primary", 11),
              }}
            />
            <div
              style={{
                aspectRatio: "1",
                backgroundColor: "#03c07c",
              }}
            />
          </Grid.Col>
          {/* End Desktop */}

          {/* Mobile */}
          <Grid.Col
            xs={4}
            md={0}
            style={{
              aspectRatio: "1",
              backgroundColor: theme.color("primary", 11),
            }}
          />
          <Grid.Col
            xs={4}
            md={0}
            style={{
              aspectRatio: "1",
              backgroundColor: "#03c07c",
            }}
          />
          {/* End Mobile */}

          <Grid.Col
            xs={12}
            style={{ aspectRatio: "3", backgroundColor: "#fcd971" }}
          />
        </Grid.Row>
      </MainGutters>
      {/* <Palette themeColor="primary" /> */}
    </Theme>
  );
}
