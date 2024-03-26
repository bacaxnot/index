"use client";

import useAuth from "@/lib/hooks/use-auth";
import { type AllHTMLProps } from "@/lib/types.helpers";
import { cn } from "@/lib/utils";

type Props = AllHTMLProps<"button">;

export default function ButtonLogin({ className, onClick, ...props }: Props) {
  const { signIn } = useAuth();

  return (
    <button
      className={cn(
        "border border-transparent py-2 hover:border-white",
        className
      )}
      type="button"
      onClick={signIn}
      {...props}
    >
      unlock [?]
    </button>
  );
}
