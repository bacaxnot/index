import {
  type CookieMethods,
  createBrowserClient,
  createServerClient,
} from "@supabase/ssr";
export { type CookieOptions } from "@supabase/ssr";
export { type SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

export const serverClient = createServerClient;

export const browserClient = createBrowserClient;

export type CookieConfig = CookieMethods;

export function credentials() {
  const SUPABASE_AUTH_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    import.meta.env.PUBLIC_SUPABASE_URL;

  if (!SUPABASE_AUTH_URL) {
    throw new Error(
      "Missing env variable NEXT_PUBLIC_SUPABASE_URL (Next.js) or SUPABASE_URL (Express, Remix) or PUBLIC_SUPABASE_URL (Astro, Vite)"
    );
  }

  const SUPABASE_ANON_KEY =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing env variable NEXT_PUBLIC_SUPABASE_ANON_KEY (Next.js) or SUPABASE_ANON_KEY (Express, Remix) or PUBLIC_SUPABASE_ANON_KEY (Astro, Vite)"
    );
  }

  return { SUPABASE_AUTH_URL, SUPABASE_ANON_KEY };
}
