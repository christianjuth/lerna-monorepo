import * as React from "react";
import styled from "styled-components";
import { theme } from "./Theme";
import { mediaQuery } from "./Grid/utils";

export type ReactChild<T = never> = React.ReactNode | null | T;
export type ReactChildren<T = never> = ReactChild<T> | ReactChildren<T>[];

const MAIN_GUTTERS_PADDING = "calc(1vw + 8px)";
const MOBILE_QUERY = ["xs", "lg"] as const;
const DESKTOP_QUERY = ["lg"] as const;

type TargetScreen = "always" | "mobile-only" | "desktop-only" | "none";

export declare namespace MainGutters {
  type Props = {
    children?: ReactChildren<string>;
    innerStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    className?: string;
    leftGutter?: TargetScreen;
    rightGutter?: TargetScreen;
    padding?: TargetScreen;
    baseWidth?: number | string;
    maxWidth?: number;
    id?: string;
  };
}

const Wrap = styled.div<
  Pick<MainGutters.Props, "leftGutter" | "rightGutter" | "padding">
>`
  display: flex;
  flex-direction: column;
  grid-row-start: 1;
  grid-row-end: 2;
  ${({ padding }) => {
    if (padding === "mobile-only" || padding === "desktop-only") {
      const query = padding === "mobile-only" ? MOBILE_QUERY : DESKTOP_QUERY;
      return `
        padding-right: 0;
        padding-left: 0;
        @media ${mediaQuery(...query)} {
          margin-right: ${MAIN_GUTTERS_PADDING};
          margin-left: ${MAIN_GUTTERS_PADDING};
        }
      `;
    }
    if (padding === "always") {
      return `
        margin-right: ${MAIN_GUTTERS_PADDING};
        margin-left: ${MAIN_GUTTERS_PADDING};
      `;
    }
  }}
  ${({ leftGutter }) => {
    switch (leftGutter) {
      case "always":
        return "grid-column-start: 2;";
      case "desktop-only":
        return `
          grid-column-start: 1;
          @media ${mediaQuery(...DESKTOP_QUERY)} {
            grid-column-start: 2;
          }
          @media ${mediaQuery(...MOBILE_QUERY)} {
            margin-left: 0;
          }
        `;
      case "mobile-only":
        return `
          grid-column-start: 1;
          @media ${mediaQuery(...DESKTOP_QUERY)} {
            margin-left: 0;
          }
          @media ${mediaQuery(...MOBILE_QUERY)} {
            grid-column-start: 2;
          }
        `;
      case "none":
        return `
          grid-column-start: 1;
          && { margin-left: 0; }
        `;
    }
  }}
  ${({ rightGutter }) => {
    switch (rightGutter) {
      case "always":
        return "grid-column-end: 3;";
      case "desktop-only":
        return `
          grid-column-end: 4;
          @media ${mediaQuery(...DESKTOP_QUERY)} {
            grid-column-end: 3;
          }
          @media ${mediaQuery(...MOBILE_QUERY)} {
            margin-right: 0;
          }
        `;
      case "mobile-only":
        return `
          grid-column-end: 4;
          @media ${mediaQuery(...DESKTOP_QUERY)} {
            margin-right: 0;
          }
          @media ${mediaQuery(...MOBILE_QUERY)} {
            grid-column-end: 3;
          }
        `;
      case "none":
        return `
          grid-column-end: 4;
          && { margin-right: 0; }
        `;
    }
  }}
`;

export function MainGutters({
  children,
  className,
  style,
  innerStyle,
  rightGutter = "always",
  leftGutter = "always",
  padding = "always",
  baseWidth = `var(${theme.VARIABLE_NAMES.MAIN_GUTTERS_BASE_WIDTH})`,
  maxWidth,
  id,
}: MainGutters.Props) {
  const middleCol = maxWidth
    ? `${maxWidth}px`
    : `calc(${
        typeof baseWidth === "number" ? `${baseWidth}px` : baseWidth
      } + 22vw)`;

  return (
    <div
      id={id}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `1fr minmax(auto, ${middleCol}) 1fr`,
        gridTemplateRows: "100%",
        width: "100%",
        ...style,
      }}
    >
      <Wrap
        padding={padding}
        rightGutter={rightGutter}
        leftGutter={leftGutter}
        style={innerStyle}
      >
        {children}
      </Wrap>
    </div>
  );
}
MainGutters.padding = MAIN_GUTTERS_PADDING;

export function useGuttersWidth(
  baseWidth = `var(${theme.VARIABLE_NAMES.MAIN_GUTTERS_BASE_WIDTH})`
) {
  const [pageWidth, setPageWidth] = React.useState(0);
  const [gutterWidth, setGutterWidth] = React.useState(0);

  React.useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const div = document.createElement("div");
    body.append(div);

    const responsiveWidth = `calc(${
      typeof baseWidth === "number" ? `${baseWidth}px` : baseWidth
    } + 22vw - (2 * (1vw + 8px)))`;

    div.style.width = responsiveWidth;
    div.style.maxWidth = `calc(100vw - (2 * (1vw + 8px)))`;

    function measure() {
      const pageWidth = document.body.offsetWidth;
      const content = div.offsetWidth;
      const gutters = pageWidth - content;
      setGutterWidth(gutters / 2);
      setPageWidth(pageWidth);
    }
    measure()

    window.addEventListener('resize', measure)

    return () => {
      window.removeEventListener('resize', measure)
      div.remove()
    }
  }, [baseWidth]);

  return [gutterWidth, pageWidth, gutterWidth] as const;
}

export default MainGutters;
