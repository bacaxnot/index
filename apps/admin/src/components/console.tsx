import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";

export function Console() {
  const [input, setInput] = useState("help");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  return (
    <section className="size-full">
      <ScrollArea>
        <p>some output</p>
      </ScrollArea>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="w-full"
      />
    </section>
  );
}
