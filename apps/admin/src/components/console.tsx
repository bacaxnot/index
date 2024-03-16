import { useTerminal } from "@/lib/cli/hooks/use-terminal";
import { ScrollArea } from "./ui/scroll-area";
import { bxnsh } from "@/lib/cli/instances/terminals/bxnsh";
import type { ITerminalHistory } from "@/lib/cli/entities/terminal";
import { cn } from "@/lib/utils";
import { Markdown } from "./ui/markdown";

export function Console() {
  const { history, input } = useTerminal({ terminal: bxnsh });

  return (
    <section className="size-full text-sm standalone:text-base flex flex-col">
      <ScrollArea className="grow">
        <ul className="grid gap-2">
          {history.map((entry, index) => (
            <ConsoleEntry key={index} {...entry} />
          ))}
        </ul>
      </ScrollArea>
      <section className="flex gap-2 px-4 py-2">
        <span>@bacaxnot:</span>
        <input
          {...input}
          type="text"
          className="grow px-0 py-0 bg-inherit focus-visible:outline-none text-muted-foreground"
        />
      </section>
    </section>
  );
}

function ConsoleEntry(props: ITerminalHistory[0]) {
  const error = props.type === "error";
  return (
    <p
      className={cn({
        "px-4 py-2 grid gap-1": true,
        "bg-red-500/10": error,
      })}
    >
      <section>
        <h3 className="flex gap-2 text-gray-400/90 text-xs">
          <span>@bacaxnot</span>
          <span>{formatDuration(props.duration, ["(", ")"])}</span>
        </h3>
        <p className={cn({ "text-red-400": error })}>{props.input}</p>
      </section>
      <Markdown className="prose prose-sm prose-invert">
        {props.output}
      </Markdown>
    </p>
  );
}

function formatDuration(ms: number, wrapper?: [string, string]) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;
  const remainingMilliseconds = ms % 1000;

  const durationParts = [];

  if (days > 0) {
    durationParts.push(`${days}d`);
  }
  if (remainingHours > 0) {
    durationParts.push(`${remainingHours}h`);
  }
  if (remainingMinutes > 0) {
    durationParts.push(`${remainingMinutes}m`);
  }
  if (remainingSeconds > 0) {
    durationParts.push(`${remainingSeconds}s`);
  }
  if (remainingMilliseconds > 0) {
    durationParts.push(`${remainingMilliseconds}ms`);
  } else {
    durationParts.push("0ms");
  }

  const duration = durationParts.join(" ");

  if (wrapper) {
    const [start, end] = wrapper;
    return `${start}${duration}${end}`;
  }

  return duration;
}
