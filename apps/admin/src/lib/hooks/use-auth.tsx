import { authClient } from "@bxn/auth/browser/client";

export default function useAuth() {
  const auth = authClient();

  const signIn = async () => {
    await auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };
  const signOut = async () => {
    await auth.signOut();
  };
  return { signIn, signOut };
}
