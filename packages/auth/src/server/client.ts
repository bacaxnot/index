import {
  CookieConfig,
  credentials,
  serverClient,
  type SupabaseAuthClient,
} from "@/utils/supabase";
export type { CookieOptions } from "@/utils/supabase";

export function authClient(cookiesConfig: CookieConfig): SupabaseAuthClient {
  const { SUPABASE_ANON_KEY, SUPABASE_AUTH_URL } = credentials();
  const client = serverClient(SUPABASE_AUTH_URL, SUPABASE_ANON_KEY, {
    cookies: cookiesConfig,
  });
  return client.auth;
}
