export type ReactChild<T = never> = React.ReactNode | null | T;
export type ReactChildren<T = never> = ReactChild<T> | ReactChildren<T>[];

export type TransformProps<A extends any> = {
  [K in keyof A]: K extends "children" ? ReactChildren : A[K];
};
