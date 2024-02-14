/// <reference types="astro/client" />

interface ImportMetaEnv {
	BLOG_APP_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
