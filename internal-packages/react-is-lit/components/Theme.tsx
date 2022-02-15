import { Theme as LitTheme } from "@christianjuth/get-lit/dist/src/gl-theme";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const Theme = createComponent(React, "gl-theme", LitTheme);
