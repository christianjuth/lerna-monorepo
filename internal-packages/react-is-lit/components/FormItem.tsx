import { FormItem as LitFormItem } from "@christianjuth/get-lit/dist/src/gl-form";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const FormItem = createComponent(React, "gl-form-item", LitFormItem);
