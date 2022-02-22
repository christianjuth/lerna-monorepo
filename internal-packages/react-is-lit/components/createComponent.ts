import { createComponent as litCreateComponent } from "@lit-labs/react";
import * as React from "react";

type TransformBooleans<T> = {
  [Key in keyof T]: T[Key] extends "true" | "false" ? boolean : T[Key];
};

declare type Events<S, I> = {
  [P in keyof S]?: (e: Omit<Event, "target"> & { target: I }) => unknown;
};
declare type Constructor<T> = {
  new (): T;
};

export function createComponent<
  I extends HTMLElement,
  E extends Record<string, string>
>(
  react: typeof React,
  tagName: string,
  elementClass: Constructor<I>,
  events?: E | undefined,
  displayName?: string | undefined
): React.ForwardRefExoticComponent<
  React.PropsWithRef<
    Partial<Omit<TransformBooleans<I>, "children">> &
      Events<E, I> &
      Omit<React.HTMLAttributes<HTMLElement>, keyof E>
  > & {
    children?: React.ReactNode;
  } & React.RefAttributes<unknown>
> {
  const comp = litCreateComponent(
    react,
    tagName,
    elementClass,
    events,
    displayName
  );

  return comp as any;
}
