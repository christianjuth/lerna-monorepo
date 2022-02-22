import { Checkbox as LitCheckbox } from "@christianjuth/get-lit/dist/src/gl-checkbox";
import { createComponent } from "./createComponent";
import * as React from "react";

export const Checkbox = createComponent(React, "gl-checkbox", LitCheckbox, {
  onChange: "click",
});
