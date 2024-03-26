import { authClient, CookieOptions } from "@bxn/auth/server/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) return NextResponse.redirect(`${origin}/unlock?error=no-code`);

  const cookieStore = cookies();
  const auth = authClient({
    get(name: string) {
      return cookieStore.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
      cookieStore.set({ name, value, ...options });
    },
    remove(name: string, options: CookieOptions) {
      cookieStore.delete({ name, ...options });
    },
  });

  const { error } = await auth.exchangeCodeForSession(code);
  if (error)
    return NextResponse.redirect(
      `${origin}/unlock?error=error-exchanging-code`
    );
  console.log(`returning to ${origin}${next}`);
  return NextResponse.redirect(`${origin}${next}`);
}
