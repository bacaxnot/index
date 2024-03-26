import { NextResponse } from "next/server";
import { authClient, type CookieOptions } from "@bxn/auth/server/client";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("hitting middleware");
  let res = NextResponse.next({
    headers: req.headers,
  });
  const auth = authClient({
    get(name: string) {
      return req.cookies.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
      req.cookies.set({
        name,
        value,
        ...options,
      });
      res = NextResponse.next({
        request: {
          headers: req.headers,
        },
      });
      res.cookies.set({
        name,
        value,
        ...options,
      });
    },
    remove(name: string, options: CookieOptions) {
      req.cookies.set({
        name,
        value: "",
        ...options,
      });
      res = NextResponse.next({
        request: {
          headers: req.headers,
        },
      });
      res.cookies.set({
        name,
        value: "",
        ...options,
      });
    },
  });

  const {
    data: { session },
  } = await auth.getSession();

  if (!session)
    return NextResponse.redirect(new URL("/unlock", req.url), { status: 302 });

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (authentication routes)
     * - unlock (authentication page)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|unlock|api/auth|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
