import { Button } from "./Button";
import { Input } from "./Input";
import { FlexRow } from "./UtilityStyles";
import { Theme } from "./Theme";
import { GenericProps } from "./types";
import { AiOutlineSearch } from "react-icons/ai";

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
    <FlexRow className={className}>
      <Input
        placeholder="Search..."
        themeColor={themeColor}
        {...input}
        size={size}
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <Button
        themeColor={themeColor}
        {...cta}
        size={size}
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        {cta?.children ?? <AiOutlineSearch />}
      </Button>
    </FlexRow>
  );
}
