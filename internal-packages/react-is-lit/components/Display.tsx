import { Display as LitDisplay } from "@christianjuth/get-lit/dist/src/gl-display";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const Display = createComponent(React, "gl-display", LitDisplay);
