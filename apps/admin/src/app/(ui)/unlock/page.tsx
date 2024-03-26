import { AsciiArt } from "@/components/ascii-art";
import ButtonLogin from "@/components/button-login";
import React from "react";

export default async function UnlockPage() {
  return (
    <main className="standalone:pb-6 grid pt-4 standalone:px-2">
      <AsciiArt design="lock" className="text-xs" />
      <ButtonLogin next={"/"} />
    </main>
  );
}
