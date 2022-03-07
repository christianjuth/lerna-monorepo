import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/theme-dracula";

export function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => any;
}) {
  return (
    <AceEditor
      mode="glsl"
      theme="dracula"
      name="UNIQUE_ID_OF_DIV"
      defaultValue={value}
      onChange={onChange}
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );
}

export default Editor;
