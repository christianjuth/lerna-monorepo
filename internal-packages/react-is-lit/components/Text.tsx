import { Text as LitText } from "@christianjuth/get-lit/dist/src/gl-text";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const Text = createComponent(React, "gl-text", LitText);