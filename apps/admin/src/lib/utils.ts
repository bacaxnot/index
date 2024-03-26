import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a string to a slug
 * @param str - The string to convert to a slug
 * @returns - The slugified string
 * @example
 * ```
 * const slug = sluggify("Hello, World!");
 * console.log(slug); // hello-world
 * ```
 */
export function sluggify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");
}
