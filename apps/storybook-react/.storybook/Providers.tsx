import { Theme } from "@christianjuth/ui";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { useDarkMode } from "storybook-dark-mode";
import { theme } from "../src/config/theme";
import { Theme as LitTheme } from "@christianjuth/react-is-lit";

export function StoryWrapper({ children }: { children: any }) {
  const darkMode = useDarkMode();

  return (
    <Theme
      {...theme}
      useDarkTheme={darkMode}
      addBodyStyles
      button={{ defaultVariant: "contained" }}
    >
      {children}
    </Theme>
  );
}

export function LitProvider({ children }: { children: any }) {
  const darkMode = useDarkMode();

  return (
    <LitTheme
      theme={{
        ...theme,
        useDarkTheme: darkMode,
        roundness: 6
      }}
      link={{
        onClick: () => window.location.href = "//google.com"
      }}
    >
      {children}
    </LitTheme>
  );
}

export function DocsWrapper({
  children,
  context,
}: {
  children: any;
  context: any;
}) {
  const darkMode = useDarkMode();

  return (
    <Theme {...theme} useDarkTheme={darkMode} addBodyStyles>
      <DocsContainer context={context}>{children}</DocsContainer>
    </Theme>
  );
}
