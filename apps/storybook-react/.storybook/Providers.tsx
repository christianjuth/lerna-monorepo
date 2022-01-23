import { MainGutters, Theme } from "@christianjuth/ui";
import { useDarkMode } from "storybook-dark-mode";
import { theme } from "../src/config/theme";
import { DocsContainer } from "@storybook/addon-docs/blocks";

export function StoryWrapper({ children }: { children: any }) {
  const darkMode = useDarkMode();

  return (
    <Theme {...theme} useDarkTheme={darkMode} addBodyStyles>
      {children}
    </Theme>
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
