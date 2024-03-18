import { useEffect, useRef, useState } from "react";
import type { ITerminal } from "../entities/terminal";
import { useEnterKey } from "@/lib/hooks/use-enter-key";

export function useTerminal({ terminal }: { terminal: ITerminal }) {
  const terminalRef = useRef(terminal);
  const inputRef = useRef<HTMLInputElement>(null);

  const [history, setHistory] = useState([...terminal.history]);
  const [input, setInput] = useState("");

  async function run(input: string) {
    if (input === "") return;
    await terminalRef.current.run(input);
    setHistory([...terminalRef.current.history]);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleSubmit() {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    const isInputFocused = inputElement === document.activeElement;
    if (!isInputFocused) return;

    setInput("");
    await run(input);
  }

  useEnterKey({ onEnter: handleSubmit });

  return {
    history,
    run,
    input: {
      value: input,
      ref: inputRef,
      onChange: handleInputChange,
    },
  };
}
