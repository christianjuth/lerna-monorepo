import { HTMLAttributes, MouseEventHandler } from "react";

export type ReactChild<T = never> = React.ReactNode | null | T;
export type ReactChildren<T = never> = ReactChild<T> | ReactChildren<T>[];

export declare namespace GenericProps {
  type Size = "sm" | "md" | "lg";
}

const domEvents = [
  "onClick",
  "onContextMenu",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
] as const;

export type DomEvents<Element = HTMLElement> = Partial<
  Record<typeof domEvents[number], MouseEventHandler<Element>>
>;

export type HSLColor = [number, number, number, number?];