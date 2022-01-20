import { Theme } from "@christianjuth/ui";

export const baseTheme: Theme.Config = {
  primary: ({ l, shade }) => [256, 100 - shade, l],
  accent1: ({ l, shade }) => [165 + shade, 82, l],
  gray: ({ l }) => [0, 0, l],
};

export const darkTheme: Partial<Theme.Config> = {
  gray: ({ l }) => [0, 0, 100 - l],
}

export const theme = {
  baseTheme,
  darkTheme
}