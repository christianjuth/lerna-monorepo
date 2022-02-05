import {
  AspectRatioBox,
  Button,
  Carousel,
  MainGutters,
  Navbar,
  SC,
  Text,
  Theme,
  theme,
} from "@christianjuth/ui";
import { CSSProperties, Fragment, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { RiNetflixFill } from "react-icons/ri";
import styled from "styled-components";

const CAROUSEL_RIGHT_ICON = <FiChevronRight color="white" size={40} />;

const CAROUSEL_LEFT_ICON = <FiChevronLeft color="white" size={40} />;

const CATEGORIES = [
  "Popular on Netflix",
  "Continue Watching",
  "Trending Now",
  "Watch It Again",
  "My List",
];

const MORE_CATEGORIES = [
  "Top Picks for You",
  "Only on Netflix",
  "Retro TV",
  "Bingeworthy TV Shows",
  "Comedies",
  "Documentaries",
  "Critically Acclaimed Films",
  "Romantic Movies",
  "Emmy-winnine Witty TV Shows",
  "TV Shows",
];

function useTransparentNavbar() {
  const [transparent, setTransparent] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const newTransparent = window.scrollY < 10;
      if (newTransparent !== transparent) {
        setTransparent(newTransparent);
      }
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [transparent]);

  return transparent;
}

const Show = styled.a`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 5px;
  && {
    color: white;
    background-color: gray;
    text-decoration: none;
  }
  :focus {
    outline-color: white;
  }
`;

const Overlay = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

function Logo({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 924 250" version="1.1" style={style}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill="#D81F26" fillRule="nonzero">
          <path
            d="M126.925781,233.387019 C113.039964,235.825421 98.9098558,236.55649 84.2929688,238.503606 L39.7094351,107.924279 L39.7094351,244.107873 C25.8236178,245.569111 13.155649,247.518029 0,249.466947 L0,0 L37.03125,0 L87.703125,141.545373 L87.703125,0 L126.925781,0 L126.925781,233.387019 Z M203.666466,91.3575721 C218.771935,91.3575721 241.915565,90.6265024 255.801382,90.6265024 L255.801382,129.604868 C238.503606,129.604868 218.284255,129.604868 203.666466,130.335938 L203.666466,188.31851 C226.567608,186.857272 249.467849,184.90655 272.610577,184.175481 L272.610577,221.690805 L164.686298,230.219351 L164.686298,0 L272.610577,0 L272.610577,38.9792668 L203.666466,38.9792668 L203.666466,91.3575721 Z M417.564303,38.9801683 L377.123798,38.9801683 L377.123798,218.284255 C363.968149,218.284255 350.8125,218.284255 338.146334,218.770132 L338.146334,38.9801683 L297.705829,38.9801683 L297.705829,0 L417.566106,0 L417.564303,38.9801683 Z M480.905048,88.6784856 L534.258714,88.6784856 L534.258714,127.656851 L480.905048,127.656851 L480.905048,216.091947 L442.654147,216.091947 L442.654147,0 L551.555589,0 L551.555589,38.9792668 L480.905048,38.9792668 L480.905048,88.6784856 Z M614.896334,181.984075 C637.066406,182.469952 659.478065,184.178185 681.161358,185.394231 L681.161358,223.886719 C646.324219,221.692608 611.486178,219.503005 575.917969,218.770132 L575.917969,0 L614.896334,0 L614.896334,181.984075 Z M714.049579,226.566707 C726.474159,227.298678 739.629808,228.029748 752.297776,229.489183 L752.297776,0 L714.049579,0 L714.049579,226.566707 Z M923.076923,0 L873.621094,118.643329 L923.076923,249.466947 C908.458233,247.518029 893.841346,244.838041 879.223558,242.401442 L851.208534,170.291466 L822.707632,236.55649 C808.57482,234.118089 794.932392,233.387019 780.804988,231.438101 L830.990084,117.180288 L785.675481,0 L827.576322,0 L853.15655,65.5339543 L880.443209,0 L923.076923,0 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function Netflix() {
  const transparentNavbar = useTransparentNavbar();

  return (
    <Theme
      baseTheme={{
        primary: ({ l }) => [351, 100, l],
        accent1: ({ l }) => [0, 0, l],
        gray: ({ l, shade }) => [218, shade + 10, l],
      }}
      darkTheme={{
        gray: ({ l }) => [218, 0, 100 - l],
      }}
      useDarkTheme={true}
      roundness={5}
      mainGutters={{
        baseWidth: "1100px",
      }}
      addBodyStyles
      button={{
        fontStyle: "normal",
        defaultVariant: "contained",
        defaultThemeColor: "gray",
      }}
      pageBackground={theme.color("gray", 0)}
    >
      <Navbar
        defaultItemSize="md"
        logo={<Logo style={{ width: 100, alignSelf: "center" }} />}
        leftItems={[
          { link: { children: "Home" } },
          { link: { children: "TV Shows" } },
          { link: { children: "Movies" } },
          { link: { children: "New & Popular" } },
          { link: { children: "My List" } },
        ]}
        style={{
          position: "fixed",
          background: transparentNavbar
            ? `linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.7) 65%,
            rgba(255, 255, 255, 0) 100%
          )`
            : "",
        }}
        variant={transparentNavbar ? "transparent" : "contained"}
        rightItems={[{ search: {} }]}
      />

      <div style={{ height: "70vh", width: "100%", position: "absolute" }}>
        <img
          src="https://wallpapercave.com/wp/wp4372386.jpg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Overlay />
      </div>

      <MainGutters
        style={{
          paddingTop: Navbar.height("md"),
        }}
        innerStyle={{
          minHeight: "50vh",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <SC.FlexCol style={{ alignItems: "flex-start" }}>
          <Text uppercase>
            <RiNetflixFill
              size="1.4em"
              style={{ transform: "translate(0, 6px)" }}
              color={theme.color("primary", 9)}
            />
            Series
          </Text>
          <Text variant="h3">Black Mirror</Text>
          <SC.FlexRow $spacing={2}>
            <Button style={{ minWidth: 150 }} size="lg">
              <BsFillPlayFill size="1.8em" /> Play
            </Button>
            <Button style={{ minWidth: 180 }} themeColor="accent1" size="lg">
              <BiInfoCircle size="1.7em" style={{ marginRight: "0.5ch" }} />{" "}
              More Info
            </Button>
          </SC.FlexRow>
        </SC.FlexCol>
      </MainGutters>

      <MainGutters
        style={{ position: "relative", paddingBottom: 50 }}
        innerStyle={{ overflow: "hidden" }}
      >
        {CATEGORIES.map((category, i) => (
          <Fragment key={i}>
            <Text variant="h6" style={{ marginTop: 50 }}>
              {category}
            </Text>
            <Carousel
              style={{ width: "100%" }}
              scrollBy="row"
              data={Array(20).fill(0)}
              keyExtractor={(_, i) => i}
              spaceBetween={10}
              width={250}
              rightButtonIcon={CAROUSEL_RIGHT_ICON}
              leftButtonIcon={CAROUSEL_LEFT_ICON}
              renderItem={({ index, isVisible }) => (
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Show href="#" tabIndex={isVisible ? undefined : -1}>
                    {index + 1}
                  </Show>
                </AspectRatioBox>
              )}
            />
          </Fragment>
        ))}

        <Text variant="h6" style={{ marginTop: 50 }}>
          Top Picks
        </Text>
        <Carousel
          style={{ width: "100%" }}
          scrollBy="row"
          data={Array(10).fill(0)}
          keyExtractor={(_, i) => i}
          spaceBetween={10}
          width={250}
          rightButtonIcon={CAROUSEL_RIGHT_ICON}
          leftButtonIcon={CAROUSEL_LEFT_ICON}
          renderItem={({ index, isVisible, width }) => (
            <AspectRatioBox
              aspectRatio={16 / 9}
              style={{ display: "flex", overflow: "hidden" }}
            >
              <Text
                variant="h1"
                noPadding
                style={{
                  fontSize: width * 0.6,
                  lineHeight: width / (16 / 9) + "px",
                  textAlign: "end",
                  minWidth: "45%",
                  display: "block",
                  transform: "translate(0, -1.5%)",
                  letterSpacing: "-0.1em",
                }}
              >
                {index + 1}
              </Text>
              <Show
                href="#"
                tabIndex={isVisible ? undefined : -1}
                style={{ left: "50%" }}
              >
                {index + 1}
              </Show>
            </AspectRatioBox>
          )}
        />

        {MORE_CATEGORIES.map((category, i) => (
          <Fragment key={i}>
            <Text variant="h6" style={{ marginTop: 50 }}>
              {category}
            </Text>
            <Carousel
              style={{ width: "100%" }}
              scrollBy="row"
              data={Array(20).fill(0)}
              keyExtractor={(_, i) => i}
              spaceBetween={10}
              width={250}
              rightButtonIcon={CAROUSEL_RIGHT_ICON}
              leftButtonIcon={CAROUSEL_LEFT_ICON}
              renderItem={({ index, isVisible }) => (
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Show href="#" tabIndex={isVisible ? undefined : -1}>
                    {index + 1}
                  </Show>
                </AspectRatioBox>
              )}
            />
          </Fragment>
        ))}
      </MainGutters>
    </Theme>
  );
}
