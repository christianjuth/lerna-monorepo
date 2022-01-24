import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { textStyles } from "./Text";
import { HSLColor, ReactChildren } from "./types";
import { getAdjustedColor, remap } from "./utils";

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
    --dark-mode-bit: 1;
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
  modifier?: "text"
) {
  if (modifier === "text") {
    const invertedBit = `var(${varName(color, "inverted", "bit")})`
    if (shade < 5) {
      return `hsl(0, 0%, calc(${invertedBit} * 100%))`;
    } else if (shade > 10) {
      return `hsl(0, 0%, calc((1 - ${invertedBit}) * 100%))`;
    } else {
      return WHITE;
    }
  }

  return `hsla(var(${varName(color, shade, modifier)}), 100%)`;
}

function hslToString([h, s, l]: HSLColor) {
  return `${h}, ${s}%, ${Math.round(l)}%`;
}

function generatePallet(color: Theme.ColorName, fn: Theme.ColorFn) {
  let vars = "";

  const inverted = fn({ l: 100, shade: 0 })[2] < 50; // check if luminance starts low

  vars += `${varName(color, "inverted", "bit")}: ${inverted ? 1 : 0};`

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
  addBodyStyles = false,
}: {
  baseTheme: Theme.Config;
  darkTheme: Partial<Theme.Config>;
  useDarkTheme?: boolean;
  children: ReactChildren;
  addBodyStyles?: boolean;
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
    --dark-mode-bit: 0;
    ${darkMode("--dark-mode-bit: 1;")}
    background-color: hsl(${hslToString(baseTheme.gray({ l: 100, shade: 0 }))});
    color: hsl(${hslToString(baseTheme.gray({ l: 0, shade: SHADE_STOPS }))});

    ${
      darkTheme.gray
        ? darkMode(
            `
              background-color: hsl(${hslToString(
                darkTheme.gray({ l: 100, shade: 0 })
              )});
              color: hsl(${hslToString(
                darkTheme.gray({ l: 0, shade: SHADE_STOPS })
              )});
            `
          )
        : ""
    }

    * {
      box-sizing: border-box;
    }

    *::selection {
      background: ${color("primary", 2)};
    }
    *::-moz-selection {
      background: ${color("primary", 2)}; 
    }

    ${darkMode(`
      *::selection {
        background: ${color("primary", 9)};
      } 
      *::-moz-selection {
        background: ${color("primary", 9)};
      }
    `)}
  `;

  return (
    <ThemeProvider theme={{ darkMode }}>
      {addBodyStyles && (
        <GlobalStyles
          $bodyStyles={backgroudColor}
          $baseTheme={baseTheme}
          $darkTheme={darkTheme}
          $useDarkTheme={useDarkTheme}
        />
      )}
      <CSSVariableProvider
        $baseTheme={baseTheme}
        $darkTheme={darkTheme}
        $useDarkTheme={useDarkTheme}
        $style={backgroudColor}
      >
        {children}
      </CSSVariableProvider>
    </ThemeProvider>
  );
}
