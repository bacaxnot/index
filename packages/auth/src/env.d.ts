/**
 * This is for the `import.meta.env` type checking, so we can work in vite related projects.
 */
declare interface ImportMeta {
  env: Record<string, string | undefined>;
}
