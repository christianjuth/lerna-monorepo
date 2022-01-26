import { MainGutters, ReactChildren, theme } from "@christianjuth/ui";
import { CSSProperties } from "react";

export function Section({
  children,
  dark,
  id,
  style,
  slim
}: {
  children: ReactChildren;
  dark?: boolean;
  id?: string;
  style?: CSSProperties;
  slim?: boolean;
}) {
  return (
    <MainGutters
      id={id}
      style={{ backgroundColor: theme.color("gray", 0) }}
      innerStyle={{ padding: slim ? theme.spacing(5, 0) : '5vw 0', ...style }}
      className={dark ? "dark-mode" : undefined}
    >
      {children}
    </MainGutters>
  );
}
