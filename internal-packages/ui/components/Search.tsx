import { Button } from "./Button";
import { Input } from "./Input";
import { FlexRow } from "./UtilityStyles";
import { Theme } from "./Theme";
import { GenericProps } from "./types";

export declare namespace Search {
  export type Props = {
    input?: Partial<Input.Props>;
    cta?: Partial<Button.Props>;
    themeColor?: Theme.ColorName;
    size?: GenericProps.Size;
    className?: string;
  };
}

export function Search({
  cta,
  input,
  themeColor,
  size,
  className,
}: Search.Props) {
  return (
    <FlexRow $spacing={5} className={className}>
      <Input
        placeholder="Search..."
        themeColor={themeColor}
        {...input}
        size={size}
      />
      <Button themeColor={themeColor} {...cta} size={size}>
        {cta?.children ?? "Search"}
      </Button>
    </FlexRow>
  );
}
