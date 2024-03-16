import type { ChangeReturnType } from "@/lib/types.helpers";
import type { ITerminal } from "./terminal";

export type ICommandOption = {
  description: string;
  required: boolean;
};

export type ICommandArgument = {
  name: string;
  description: string;
  required: boolean;
};

export type ICommandAction = (input: {
  args: string[];
  options: Record<string, string>;
  terminal: ITerminal;
}) => Promise<string>;

export type ICommandConfig = {
  saveToHistory: boolean;
};

export type ICommandBuilder = {
  name: string;
  description: string;
  config?: ICommandConfig;
  arguments: ICommandArgument[];
  options: Record<string, ICommandOption>;
  action: ICommandAction;
};

type ICommandRunOutput = { start: number; duration: number; output: string };
export type ICommand = Omit<ICommandBuilder, "action"> & {
  config: ICommandConfig;
  run: ChangeReturnType<ICommandAction, Promise<ICommandRunOutput>>;
};

export class Command implements ICommand {
  name: string;
  description: string;
  arguments: ICommandArgument[];
  options: Record<string, ICommandOption>;

  config: ICommandConfig = {
    saveToHistory: true,
  };

  private action: ICommandAction;

  constructor(command: ICommandBuilder) {
    this.name = command.name;
    this.description = command.description;
    this.config = command.config || this.config;
    this.arguments = command.arguments;
    this.options = command.options;
    this.action = command.action;
  }

  async run(input: {
    args: string[];
    options: Record<string, string>;
    terminal: ITerminal;
  }) {
    const start = Date.now();
    const output = await this.action(input);
    const duration = Date.now() - start;
    return { start, output, duration };
  }
}
