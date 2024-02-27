/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly LANDING_APP_URL: string
	readonly PUBLIC_SUPABASE_URL: string
	readonly PUBLIC_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
