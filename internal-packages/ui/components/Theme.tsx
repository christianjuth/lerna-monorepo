import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { textStyles } from "./Text";
import { HSLColor, ReactChildren } from "./types";
import { getAdjustedColor, remap } from "./utils";

const SHADES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;
const SHADE_STOPS = SHADES.length;

function clamp(min: number, val: number, max: number) {
  return Math.max(min, Math.min(val, max));
}

const CSSVariableProvider = styled.div<{
  $useDarkTheme?: boolean;
  $baseTheme: Theme.Config;
  $darkTheme: Partial<Theme.Config>;
  $style: string;
}>`
  ${({ $useDarkTheme, $baseTheme, $darkTheme }) => {
    if ($useDarkTheme === false) {
      return `
          ${getVars($baseTheme)}
        `;
    } else if ($useDarkTheme === true) {
      return `
          ${getVars($baseTheme)} ${getVars($darkTheme)}
        `;
    }

    return `
        ${getVars($baseTheme)}
        @media (prefers-color-scheme: dark) { 
          ${getVars($darkTheme)}
        }
      `;
  }}

  ${({ $style }) => $style}
  ${textStyles}
`;

const GlobalStyles = createGlobalStyle<{ $bodyStyles: string }>`
  body {
    background-color: ${color("gray", 0)};
    color: ${color("gray", 15)};
    padding: 0;
    margin: 0;

    ${({ $bodyStyles }) => $bodyStyles}
  }

  a,
  .link {
    color: ${color("accent1", 4)};
  }

  * {
    box-sizing: border-box;
  }
`;

export declare namespace Theme {
  type ColorName = "primary" | "accent1" | "gray";

  type ColorFn = (parmas: { l: number; shade: number }) => HSLColor;

  type Config = Record<ColorName, ColorFn>;
}

function varName(color: Theme.ColorName, shade: number, modifier?: "text") {
  return `--${[color, shade, modifier].join("-")}`;
}

export function color(
  color: Theme.ColorName,
  shade: number,
  modifier?: "text"
) {
  return `var(${varName(color, shade, modifier)})`;
}

function hslToString([h, s, l, a]: HSLColor) {
  return `hsl(${h} ${s}% ${Math.round(l)}%${
    a ? `/ ${clamp(0, a, 100)}%` : ""
  })`;
}

function generatePallet(color: Theme.ColorName, fn: Theme.ColorFn) {
  let vars = "";
  for (let shade = 0; shade < SHADE_STOPS; shade++) {
    const lightness = remap(shade, SHADE_STOPS - 1, 0, 0, 100);
    let [h, s, l, a] = fn({ l: lightness, shade });
    l = Math.round(remap(l, 0, 100, 0, SHADE_STOPS - 1));
    const adjusted = getAdjustedColor([h, s, l, a]);
    vars += `
      ${varName(color, shade)}: ${hslToString(adjusted)};
      ${varName(color, shade, "text")}: ${l > 10 ? "black" : "white"};
    `;
  }
  return vars;
}

function getVars(palette: Partial<Theme.Config>) {
  return Object.entries(palette)
    .map(([color, fn]) => generatePallet(color as Theme.ColorName, fn))
    .join("");
}

export const spacing = (...multipliers: number[]) => {
  return multipliers
    .map((multiplier) => {
      return multiplier * 5 + "px";
    })
    .join(" ");
};

export const roundness = (...multipliers: number[]) => {
  return multipliers
    .map((multiplier) => {
      return multiplier * 6 + "px";
    })
    .join(" ");
};

const zIndexLevels = {
  header: 1000,
  modal: 1100,
  page: 0,
};

export const zIndex = (base: keyof typeof zIndexLevels, shift = 0) => {
  return zIndexLevels[base] + shift;
};

export function Theme({
  baseTheme,
  darkTheme,
  useDarkTheme,
  children,
}: {
  baseTheme: Theme.Config;
  darkTheme: Partial<Theme.Config>;
  useDarkTheme?: boolean;
  children: ReactChildren;
}) {
  function darkMode(styles: string) {
    if (useDarkTheme === true) {
      return styles;
    } else if (useDarkTheme !== false) {
      return `
        @media (prefers-color-scheme: dark) { ${styles} } 
      `;
    }
    return "";
  }

  const backgroudColor = `
    background-color: ${hslToString(baseTheme.gray({ l: 100, shade: 0 }))};
    ${
      darkTheme.gray
        ? darkMode(
            `
              background-color: ${hslToString(
                darkTheme.gray({ l: 100, shade: 0 })
              )};
              color: ${hslToString(
                darkTheme.gray({ l: 0, shade: SHADE_STOPS })
              )}; 
            `
          )
        : ""
    }
  `;

  return (
    <>
      <GlobalStyles $bodyStyles={backgroudColor} />
      <CSSVariableProvider
        $baseTheme={baseTheme}
        $darkTheme={darkTheme}
        $useDarkTheme={useDarkTheme}
        $style={backgroudColor}
      >
        <ThemeProvider theme={{ darkMode }}>{children}</ThemeProvider>
      </CSSVariableProvider>
    </>
  );
}
