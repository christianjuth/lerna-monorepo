import {
  MasonryGrid,
  Theme,
  Navbar,
  MainGutters,
  color,
  roundness,
  spacing,
  FlexRow,
  Text,
  Avatar,
  FlexCol,
} from "@christianjuth/ui";
import { FaPinterest, FaBell } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { useDarkMode } from "storybook-dark-mode";

const aspectRatios = [3 / 4, 16 / 9, 4 / 5];

function Card({ index }: { index: number }) {
  const ar = aspectRatios[index % aspectRatios.length];
  const width = 300;
  const height = Math.round(width / ar);

  return (
    <FlexCol $spacing={1}>
      <img
        style={{
          aspectRatio: ar + "",
          width: "100%",
          borderRadius: roundness(1),
        }}
        src={`https://via.placeholder.com/${width}x${height}`}
      />
      <FlexRow $spacing={1} $centerContent="vertical">
        <Avatar fullName="Jon Doe" />
        <Text variant="copy-2" noPadding>
          Jon Doe
        </Text>
      </FlexRow>
    </FlexCol>
  );
}

const data = Array(100).fill(0);

export function Pinterest() {
  const darkMode = useDarkMode();

  return (
    <Theme
      baseTheme={{
        primary: ({ l }) => [351, 100, l],
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
    >
      <Navbar
        defaultItemSize="md"
        logo={
          <FaPinterest
            size={26}
            style={{ marginTop: 3 }}
            fill={color("primary", 9)}
          />
        }
        leftItems={[
          { button: { children: "Home" } },
          { button: { children: "Today" } },
        ]}
        centerItem={{ search: {} }}
        rightItems={[
          {
            button: { children: <FaBell size={26} />, variant: "transparent" },
          },
          {
            button: {
              children: <AiFillMessage size={26} />,
              variant: "transparent",
            },
          },
        ]}
        defaultButtonVariant="contained"
      />
      <MainGutters innerStyle={{ paddingTop: spacing(2) }}>
        <MasonryGrid itemMinWidth={240}>
          {data.map((_, index) => (
            <Card key={index} index={index} />
          ))}
        </MasonryGrid>
      </MainGutters>
    </Theme>
  );
}
