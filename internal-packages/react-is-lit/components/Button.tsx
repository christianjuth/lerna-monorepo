import { Button as LitButton } from "@christianjuth/get-lit/dist/src/gl-button";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const Button = createComponent(React, "gl-button", LitButton, {
  onClick: "click",
});
