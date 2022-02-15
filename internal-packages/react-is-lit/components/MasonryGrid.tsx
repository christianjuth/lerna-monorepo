import {
  MasonryGrid as LitMasonryGrid,
  MasonryGridItem as LitMasonryGridItem
} from "@christianjuth/get-lit/dist/src/gl-masonry-grid";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const MasonryGrid = createComponent(
  React,
  "gl-masonry-grid",
  LitMasonryGrid
);
export const MasonryGridItem = createComponent(
  React,
  "gl-masonry-grid-item",
  LitMasonryGridItem
);
