import { SegmentedControl as LitSegmentedControl } from "@christianjuth/get-lit/dist/src/gl-segmented-control";
import { createComponent } from "./createComponent";
import * as React from "react";

export const SegmentedControl = createComponent(
  React,
  "gl-segmented-control",
  LitSegmentedControl
);
