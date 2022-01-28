import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { textStyles } from "./Text";
import { HSLColor, ReactChildren } from "./types";
import { getAdjustedColor, remap } from "./utils";
import { Provider, mediaQuery } from "./Grid";

const VARIABLE_NAMES = {
  DARK_MODE_BIT: "--dark-mode-bit",
  ROUNDNESS: "--roundness",
  BUTTON_FONT_STYLE: "--button-font-style",
  BUTTON_DEFAULT_VARIANT: "--button-default-variant",
  MAIN_GUTTERS_BASE_WIDTH: "--main-gutters-baseWidth",
};

const SHADES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;
const SHADE_STOPS = SHADES.length;

const WHITE = "#FFF";

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

  .dark-mode {
    ${VARIABLE_NAMES.DARK_MODE_BIT}: 1;
    ${({ $darkTheme }) => getVars($darkTheme)}
  }

  ${({ $style }) => $style}

  ${textStyles}
`;

const GlobalStyles = createGlobalStyle<{
  $bodyStyles: string;
  $useDarkTheme?: boolean;
  $baseTheme: Theme.Config;
  $darkTheme: Partial<Theme.Config>;
}>`
  body {
    background-color: ${color("gray", 0)};
    color: ${color("gray", 15)};
    padding: 0;
    margin: 0;

    ${({ $bodyStyles }) => $bodyStyles}
  }
  
  :root {
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
  }

  .dark-mode {
    ${VARIABLE_NAMES.DARK_MODE_BIT}: 1;
    ${({ $darkTheme }) => getVars($darkTheme)}
    color: ${color("gray", 15)};
  }
`;

export declare namespace Theme {
  type ColorName = "primary" | "accent1" | "gray";

  type ColorFn = (parmas: { l: number; shade: number }) => HSLColor;

  type Config = Record<ColorName, ColorFn>;
}

function varName(...parts: (string | number | undefined)[]) {
  parts = parts.filter((v) => (v ?? false) !== false);
  return `--${parts.join("-")}`;
}

export function color(
  color: Theme.ColorName,
  shade: number,
  modifier:
    | "text"
    | "transparent-overlay-1"
    | "transparent-overlay-2"
    | number = 1
) {
  if (modifier === "text") {
    const invertedBit = `var(${varName(color, "inverted", "bit")})`;
    if (shade < 6) {
      return `hsl(0, 0%, calc(${invertedBit} * 100%))`;
    } else if (shade > 10) {
      return `hsl(0, 0%, calc((1 - ${invertedBit}) * 100%))`;
    } else {
      return WHITE;
    }
  }

  if (modifier === "transparent-overlay-1") {
    const invertedBit = `var(${varName(color, "inverted", "bit")})`;
    const transparency = (high: boolean) =>
      high
        ? `calc(0.1 + (${invertedBit} / 10))`
        : `calc(0.1 + ((1 - ${invertedBit}) / 10))`;
    if (shade < 6) {
      return `hsla(0, 0%, calc(${invertedBit} * 100%), ${transparency(true)})`;
    } else if (shade > 10) {
      return `hsla(0, 0%, calc((1 - ${invertedBit}) * 100%), 0.1)`;
    } else {
      return `hsla(0, 0%, 100%, ${transparency(false)})`;
    }
  }

  if (modifier === "transparent-overlay-2") {
    const invertedBit = `var(${varName(color, "inverted", "bit")})`;
    const transparency = (high: boolean) =>
      high
        ? `calc(0.15 + (${invertedBit} / 10))`
        : `calc(0.1 + ((1 - ${invertedBit}) / 10))`;
    if (shade < 6) {
      return `hsla(0, 0%, calc(${invertedBit} * 100%), ${transparency(true)})`;
    } else if (shade > 10) {
      return `hsla(0, 0%, calc((1 - ${invertedBit}) * 100%), 0.15)`;
    } else {
      return `hsla(0, 0%, 100%, ${transparency(false)})`;
    }
  }

  return `hsla(var(${varName(color, shade)}), ${modifier * 100}%)`;
}

function hslToString([h, s, l]: HSLColor) {
  return `${h}, ${s}%, ${Math.round(l)}%`;
}

function generatePallet(color: Theme.ColorName, fn: Theme.ColorFn) {
  let vars = "";

  const inverted = fn({ l: 100, shade: 0 })[2] < 50; // check if luminance starts low

  vars += `${varName(color, "inverted", "bit")}: ${inverted ? 1 : 0};`;

  for (let shade = 0; shade < SHADE_STOPS; shade++) {
    const lightness = remap(shade, SHADE_STOPS - 1, 0, 0, 100);
    let [h, s, l] = fn({ l: lightness, shade });
    l = Math.round(remap(l, 0, 100, 0, SHADE_STOPS - 1));
    const adjusted = getAdjustedColor([h, s, l]);

    vars += `
      ${varName(color, shade)}: ${hslToString(adjusted)};
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
      return `calc(var(${VARIABLE_NAMES.ROUNDNESS}) * ${multiplier}px)`;
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
  darkTheme = {},
  useDarkTheme,
  children,
  addBodyStyles = false,
  roundness = 6,
  button,
  mainGutters,
}: {
  baseTheme: Theme.Config;
  darkTheme?: Partial<Theme.Config>;
  useDarkTheme?: boolean;
  children: ReactChildren;
  addBodyStyles?: boolean;
  roundness?: number;
  button?: {
    fontStyle?: string;
    defaultVariant?: "contained" | "outlined" | "transparent";
  };
  mainGutters?: {
    baseWidth?: number | string;
  };
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

  const styles = `
    ${VARIABLE_NAMES.DARK_MODE_BIT}: 0;
    ${VARIABLE_NAMES.ROUNDNESS}: ${roundness};
    ${VARIABLE_NAMES.BUTTON_FONT_STYLE}: ${button?.fontStyle ?? "italic"};
    ${VARIABLE_NAMES.BUTTON_DEFAULT_VARIANT}: ${button?.defaultVariant ?? ''};
    ${VARIABLE_NAMES.MAIN_GUTTERS_BASE_WIDTH}: ${
    mainGutters?.baseWidth ?? "800px"
  };

    ${darkMode(`${VARIABLE_NAMES.DARK_MODE_BIT}: 1;`)}
    background-color: ${color('gray', 0)};
    color: ${color('gray', 0, 'text')};

    ${
      darkTheme.gray
        ? darkMode(
            `
              background-color: ${color('gray', 1)};
              color: ${color('gray', 1, 'text')};
            `
          )
        : ""
    }

    * {
      box-sizing: border-box;
    }

    *::selection {
      background: ${color("accent1", 7, 0.8)};
    }
    *::-moz-selection {
      background: ${color("accent1", 7, 0.8)}; 
    }
  `;

  return (
    <ThemeProvider theme={{ darkMode, button: { defaultVariant: button?.defaultVariant ?? 'contained' } }}>
      <Provider>
        {addBodyStyles && (
          <GlobalStyles
            $bodyStyles={styles}
            $baseTheme={baseTheme}
            $darkTheme={darkTheme}
            $useDarkTheme={useDarkTheme}
          />
        )}
        <CSSVariableProvider
          $baseTheme={baseTheme}
          $darkTheme={darkTheme}
          $useDarkTheme={useDarkTheme}
          $style={!addBodyStyles ? styles : ""}
        >
          {children}
        </CSSVariableProvider>
      </Provider>
    </ThemeProvider>
  );
}

/**
 * Returns a CSS variable that is
 * either 1 if the theme is dark or
 * 0 if the theme is light
 */
function darkModeBit() {
  return `var(${VARIABLE_NAMES.DARK_MODE_BIT})`;
}

const colorPresets = {
  text: color("gray", 15),
  textMuted: color("gray", 8),
  background: color("gray", 0),
  border: color("gray", 2),
};

export const theme = {
  spacing,
  color,
  zIndex,
  roundness,
  colorPresets,
  darkModeBit,
  VARIABLE_NAMES,
  mediaQuery
};
