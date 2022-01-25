import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "./Input";
import { Button } from "./Button";
import { SC } from "./UtilityStyles";

export declare namespace Search {
  export interface Props extends Input.Props {
    showButton?: boolean;
  }
}

export function Search({ showButton = false, ...props }: Search.Props) {
  if (showButton) {
    return (
      <SC.FlexRow style={{ flex: 1 }}>
        <Input
          placeholder="Search..."
          {...props}
          style={{ flex: 1, ...props.style }}
        >
          {/* <AiOutlineSearch style={{ position: "absolute", right: 10 }} /> */}
        </Input>
        <Button themeColor={props.themeColor} size={props.size}>
          Search
        </Button>
      </SC.FlexRow>
    );
  }

  return (
    <Input placeholder="Search..." {...props}>
      <AiOutlineSearch style={{ position: "absolute", right: 10 }} />
    </Input>
  );
}
