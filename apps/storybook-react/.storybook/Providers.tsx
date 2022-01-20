import { Theme } from "@christianjuth/ui";
import { useDarkMode } from "storybook-dark-mode";
import { theme } from "../src/config/theme";

export function Providers({ children }: { children: any }) {
  const darkMode = useDarkMode();

  return (
    <Theme {...theme} useDarkTheme={darkMode}>
      {children}
    </Theme>
  );
}
