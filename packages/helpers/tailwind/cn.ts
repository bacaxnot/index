import { clsx } from "clsx";
/**
 * @description A utility function for joining class names together. It's a wrapper around the [clsx](https://www.npmjs.com/package/clsx) package.
 */
/**
 * A Record of class names. The key is the class name and the value is a boolean. If the value is truthy, the class name will be included in the output. If the value is falsey, the class name will be discarded.
 */
type ClassRecord = Record<string, boolean>;
/**
 * A valid class name is a string, number, or object. If the value is an object, keys with truthy values will be included in the output. Any falsey values are discarded. Standalone Boolean values are discarded as well.
 */
type ValidClassName =
  | string
  | number
  | ClassRecord
  | ValidClassName[]
  | undefined
  | null;
/**
 * Joins class names together and returns a string of class names separated by a space character (" ") if the value is truthy.
 * @param classes Class names to join together. If the value is falsy, it won't be included in the output. If the value is an array, it will be flattened. If the value is an object, keys with truthy values will be included in the output. Any falsey values are discarded. Standalone Boolean values are discarded as well.
 * @returns A string of valid classNames separated by a space character (" ")
 */
export function cn(...classes: ValidClassName[]) {
  return clsx(classes);
}
