import { useRef } from "react";
import styled from "styled-components";
import { spacing } from "./Theme";
import { mediaQuery } from "./Grid";
import { ReactChildren } from "./types";
import { Button } from "./Button";
import { Datepicker } from "./Datepicker";
import dayjs from "dayjs";

const FormStyle = styled.form`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: ${spacing(2)};
  grid-auto-flow: row;

  && > label {
    margin: 0;
    padding: 0;
  }

  & > * {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  & > label {
    grid-column-start: 1;
    grid-column-end: 2;
  }

  & > [data-small-form-element] {
    grid-column-start: 2;
    grid-column-end: 3;
    align-self: center;
  }

  @media ${mediaQuery("sm")} {
    && > label {
      line-height: 42px;
    }

    & > label {
      grid-column-start: 1;
      grid-column-end: 2;
    }

    & > *:not(label) {
      grid-column-start: 2;
      grid-column-end: 3;
    }

    & > hr {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`;

type FormJsonData = Record<string, string | boolean | Datepicker.Date>;

function collectFormData(elm: HTMLFormElement) {
  const jsonData: FormJsonData = {};

  elm.querySelectorAll("input,textarea").forEach((elm) => {
    const input = elm as HTMLInputElement | HTMLFormElement;
    const name = input.name;

    if (name) {
      switch (input.type) {
        case "checkbox":
          jsonData[name] = input.checked;
          break;
        case "date":
          jsonData[name] = dayjs(input.dataset.date);
          break;
        default:
          jsonData[name] = input.value;
      }
    }
  });

  return jsonData;
}

export function Form({
  children,
  onSubmit,
  submitBtn = { children: "Submit" },
}: {
  children: ReactChildren;
  onSubmit?: (data: FormJsonData) => any;
  submitBtn?: Button.Props;
}) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <FormStyle
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(collectFormData(e.target as HTMLFormElement));
      }}
    >
      {children}

      <Button {...submitBtn} htmlType="submit" />
    </FormStyle>
  );
}
