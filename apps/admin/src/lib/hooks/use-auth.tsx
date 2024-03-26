import { authClient } from "@bxn/auth/browser/client";

export default function useAuth() {
  const auth = authClient();

  const signIn = async (args?: { next?: string }) => {
    const url = new URL("api/auth/callback", window.location.origin);
    if (args?.next) {
      url.searchParams.set("next", args.next);
    }
    await auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: url,
      },
    });
  };
  const signOut = async () => {
    await auth.signOut();
  };
  return { signIn, signOut };
}
