import {
  Grid as LitGrid,
  GridItem as LitGridItem
} from "@christianjuth/get-lit/dist/src/gl-grid";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const Grid = createComponent(React, "gl-grid", LitGrid);
export const GridItem = createComponent(React, "gl-grid-item", LitGridItem);
