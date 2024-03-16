import { type ICommand } from "./command";
import { type IPackage } from "./package";

export type ITerminalHistory = {
  type: "success" | "error";
  input: string;
  start: number;
  duration: number;
  output: string;
}[];

export type ITerminalBuilder = {
  name: string;
  version: string;
  history: ITerminalHistory;
  commands: Record<string, ICommand>;
  packages: Record<string, IPackage>;
};

export type ITerminal = ITerminalBuilder & {
  run: (input: string) => Promise<void>;
};

export class Terminal implements ITerminal {
  name: string;
  version: string;
  commands: Record<string, ICommand>;
  packages: Record<string, IPackage>;
  history: ITerminalHistory;

  constructor(terminal: ITerminalBuilder) {
    this.name = terminal.name;
    this.version = terminal.version;
    this.commands = terminal.commands;
    this.packages = terminal.packages;
    this.history = terminal.history;
  }

  async run(input: string): Promise<void> {
    let [bin, ...rest] = input.split(" ");

    let command = this.commands[bin];
    if (command) return this.handleRunCommand(command, input);

    const pkg = this.packages[bin];
    if (!pkg) return this.handleCommandNotFound(bin, input);

    bin = rest[0];
    command = pkg.commands[bin];

    if (!command) return this.handleCommandNotFound(bin, input);
    return this.handleRunCommand(command, input);
  }

  protected addToHistory(entry: ITerminalHistory[0]) {
    this.history.push(entry);
  }

  protected async handleRunCommand(command: ICommand, input: string) {
    const start = Date.now();
    try {
      const [_, ...rest] = input.split(" ");
      const { args, options } = this.parseArgs(rest);
      const res = await command.run({ args, options, terminal: this });

      const { saveToHistory } = command.config;
      if (!saveToHistory) return;

      this.addToHistory({ type: "success", input, ...res });
    } catch (e) {
      const duration = Date.now() - start;
      const output = e instanceof Error ? e.message : String(e);
      this.addToHistory({
        type: "error",
        input,
        start,
        duration,
        output,
      });
    }
  }

  protected handleCommandNotFound(command: string, input: string) {
    this.addToHistory({
      type: "error",
      input,
      start: Date.now(),
      duration: 0,
      output: `command not found: ${command}`,
    });
  }

  protected parseArgs(args: string[]) {
    const parsedArgs: string[] = [];
    const parsedOptions: Record<string, string> = {};

    for (const arg of args) {
      if (arg.startsWith("--")) {
        const [key, value] = arg.slice(2).split("=");
        parsedOptions[key] = value;
      } else {
        parsedArgs.push(arg);
      }
    }

    return { args: parsedArgs, options: parsedOptions };
  }
}
