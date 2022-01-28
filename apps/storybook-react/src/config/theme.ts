import { Theme } from "@christianjuth/ui";

export const baseTheme: Theme.Config = {
  primary: ({ l, shade }) => [191 + shade, 82, l],
  // accent1: ({ l, shade }) => [256, 100 - shade, l],
  accent1: ({ l }) => [191, 100, l],
  gray: ({ l, shade }) => [218, shade + 10, l],
};

export const darkTheme: Partial<Theme.Config> = {
  gray: ({ l, shade }) => [218, 25 - shade, 100 - l],
}

export const theme = {
  baseTheme,
  darkTheme
}