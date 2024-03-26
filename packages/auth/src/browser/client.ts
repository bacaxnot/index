import {
  browserClient,
  credentials,
  type SupabaseAuthClient,
} from "@/utils/supabase";
export type { CookieOptions } from "@/utils/supabase";

export function authClient(): SupabaseAuthClient {
  const { SUPABASE_ANON_KEY, SUPABASE_AUTH_URL } = credentials();
  const client = browserClient(SUPABASE_AUTH_URL, SUPABASE_ANON_KEY);
  return client.auth;
}
