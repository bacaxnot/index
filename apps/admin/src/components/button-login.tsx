"use client";

import useAuth from "@/lib/hooks/use-auth";
import { type AllHTMLProps } from "@/lib/types.helpers";
import { cn } from "@/lib/utils";

type Props = AllHTMLProps<"button"> & {
  next?: string;
};

export default function ButtonLogin({
  className,
  onClick,
  next,
  ...props
}: Props) {
  const { signIn } = useAuth();

  return (
    <button
      className={cn(
        "border border-transparent py-2 hover:border-white",
        className
      )}
      type="button"
      onClick={() => signIn({ next: next ?? window.location.pathname })}
      {...props}
    >
      unlock [?]
    </button>
  );
}
