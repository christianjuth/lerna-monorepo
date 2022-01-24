import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "./Input";

export declare namespace Search {
  export type Props = Input.Props;
}

export function Search(props: Search.Props) {
  return (
    <Input placeholder="Search..." {...props}>
      <AiOutlineSearch style={{ position: "absolute", right: 10 }} />
    </Input>
  );
}
