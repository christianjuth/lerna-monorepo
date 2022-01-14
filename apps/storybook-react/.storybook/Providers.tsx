import { Theme } from "@christianjuth/ui";
import { useDarkMode } from "storybook-dark-mode";

export function Providers({ children }: { children: any }) {
  const darkMode = useDarkMode();

  return (
    <Theme
      baseTheme={{
        primary: ({ l, shade }) => [256, 100 - shade, l, 0],
        accent1: ({ l, shade }) => [165 + shade, 82, l, 0],
        gray: ({ l }) => [0, 0, l, 0],
      }}
      darkTheme={{
        gray: ({ l }) => [0, 0, 100 - l, 0],
      }}
      useDarkTheme={darkMode}
    >
      {children}
    </Theme>
  );
}
