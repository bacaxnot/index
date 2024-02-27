import { createServerClient, createBrowserClient, type CookieOptions } from '@supabase/ssr'
import type { AstroCookies } from 'astro'
import type { Database } from './types'

type ClientProps =
	| {
			env: 'browser'
			cookies?: never
	  }
	| {
			env: 'server'
			cookies: AstroCookies
	  }

export const supabaseClient = ({ env, cookies }: ClientProps) => {
	switch (env) {
		case 'browser':
			return supabaseBrowserClient()
		case 'server':
			return supabaseServerClient({ cookies })
	}
}

function supabaseBrowserClient() {
	return createBrowserClient<Database>(
		import.meta.env.PUBLIC_SUPABASE_URL,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY
	)
}

function supabaseServerClient({ cookies }: { cookies: AstroCookies }) {
	return createServerClient<Database>(
		import.meta.env.PUBLIC_SUPABASE_URL,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get(key: string) {
					return cookies.get(key)?.value
				},
				set(key: string, value: string, options: CookieOptions) {
					cookies.set(key, value, options)
				},
				remove(key: string, options) {
					cookies.delete(key, options)
				}
			}
		}
	)
}
