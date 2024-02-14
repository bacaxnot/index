/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  LANDING_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
