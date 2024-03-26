import { ComponentPropsWithRef, ElementType, ReactNode } from "react";
export type ChangeReturnType<T, R> = T extends (...args: infer A) => any
  ? (...args: A) => R
  : never;

export type HTMLTag = ElementType<any>;
/**
 * A custom type that accepts a generic HTML tag as a prop. This is useful to infer the correct props for a given HTML tag. This is equivalent to `React.ComponentPropsWithRef<Tag>`.
 */
export type AllHTMLProps<T extends HTMLTag> = ComponentPropsWithRef<T>;
