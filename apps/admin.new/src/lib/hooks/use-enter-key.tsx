import { useEffect } from "react";

export function useEnterKey({ onEnter }: { onEnter: () => void }) {
  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onEnter();
      }
    };

    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [onEnter]);
}
