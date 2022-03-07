import dynamic from "next/dynamic";
import { Suspense } from "react";

const AceEditor = dynamic(
  async () => {
    const aceBuilds = await import("ace-builds");

    const CDN = "https://unpkg.com/ace-builds@1.4.14/src-noconflict";

    aceBuilds.config.set("basePath", CDN);
    aceBuilds.config.set("modePath", CDN);
    aceBuilds.config.set("themePath", CDN);
    aceBuilds.config.set("workerPath", CDN);

    const ace = await import("react-ace");
    require("ace-builds/src-noconflict/mode-glsl");
    require("ace-builds/src-noconflict/theme-dracula");
    return ace;
  },
  {
    ssr: false,
  }
);

// const AceEditor = dynamic(() => import("react-ace"), { ssr: false });

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
