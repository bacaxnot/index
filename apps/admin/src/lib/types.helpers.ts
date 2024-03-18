export type ChangeReturnType<T, R> = T extends (...args: infer A) => any
  ? (...args: A) => R
  : never;
