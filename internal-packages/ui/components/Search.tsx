import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "./Input";
import { Button } from "./Button";
import { SC } from "./UtilityStyles";
import { useEffect, useRef } from "react";

export declare namespace Search {
  export interface Props extends Input.Props {
    showButton?: boolean;
  }
}

export function Search({ showButton = false, ...props }: Search.Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (
        !["INPUT", "TEXTAREA"].includes(
          window.document.activeElement?.tagName ?? ""
        )
      ) {
        if (e.key === "/") {
          e.preventDefault();
          ref.current?.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (showButton) {
    return (
      <SC.FlexRow style={{ flex: 1 }}>
        <Input
          placeholder="Search..."
          ref={ref}
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
    <Input placeholder="Search..." ref={ref} {...props}>
      <AiOutlineSearch style={{ position: "absolute", right: 10 }} />
    </Input>
  );
}
