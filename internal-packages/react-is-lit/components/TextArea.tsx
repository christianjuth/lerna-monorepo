import { TextArea as LitTextArea } from "@christianjuth/get-lit/dist/src/gl-text-area";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const TextArea = createComponent(React, "gl-text-area", LitTextArea, {
  onChange: "input",
  onKeyDown: "keydown",
  onKeyPress: "keypress",
  onKeyUp: "keyup",
});
