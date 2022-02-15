import { Input as LitInput } from "@christianjuth/get-lit/dist/src/gl-input";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const Input = createComponent(React, "gl-input", LitInput, {
  onChange: "input",
  onKeyDown: "keydown",
  onKeyPress: "keypress",
  onKeyUp: "keyup",
});
