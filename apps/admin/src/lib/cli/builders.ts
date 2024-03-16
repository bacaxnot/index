import {
  Command,
  type ICommand,
  type ICommandAction,
  type ICommandBuilder,
  type ICommandConfig,
} from "./entities/command";
import { Package, type IPackageBuilder } from "./entities/package";
import { Terminal, type ITerminalBuilder } from "./entities/terminal";
import {
  CLINameSchema,
  CLIOptionKeySchema,
  MajorMinorPatchSchema,
} from "./schemas";

/**
 * Represents a command builder used to construct a command object.
 */
export class CommandBuilder {
  private _command: ICommandBuilder = {
    name: "",
    description: "",
    arguments: [],
    options: {},
    config: undefined,
    action: async () => "",
  };

  /**
   * Sets the name of the command.
   * @param name - The name of the command.
   * @returns The command builder instance.
   */
  name(name: string) {
    const validName = CLINameSchema.parse(name);
    this._command.name = validName;
    return this;
  }

  /**
   * Sets the description of the command.
   * @param description - The description of the command.
   * @returns The command builder instance.
   */
  description(description: string) {
    this._command.description = description;
    return this;
  }

  /**
   * Sets the configuration of the command.
   * @param config - The configuration of the command.
   * @returns The command builder instance.
   */
  config(config: ICommandConfig) {
    this._command.config = config;
    return this;
  }

  /**
   * Adds an option to the command.
   * @param name - The name of the option.
   * @param description - The description of the option.
   * @param required - Indicates whether the option is required (default: false).
   * @returns The command builder instance.
   */
  option(name: string, description: string, required = false) {
    const validName = CLIOptionKeySchema.parse(name);
    this._command.options[validName] = { description, required };
    return this;
  }

  /**
   * Adds an argument to the command.
   * @param name - The name of the argument.
   * @param description - The description of the argument.
   * @param required - Indicates whether the argument is required (default: false).
   * @returns The command builder instance.
   */
  argument(name: string, description: string, required = false) {
    const validName = CLINameSchema.parse(name);
    this._command.arguments.push({
      name: validName,
      description,
      required,
    });
    return this;
  }

  /**
   * Sets the action to be executed when the command is run.
   * @param action - The action to be executed.
   * @returns The command builder instance.
   */
  action(action: ICommandAction) {
    this._command.action = action;
    return this;
  }

  /**
   * Builds and returns the command object.
   * @returns The command object.
   */
  build() {
    return new Command(this._command);
  }
}

/**
 * Represents a package builder.
 */
export class PackageBuilder {
  private _package: IPackageBuilder = {
    name: "",
    description: "",
    version: "",
    commands: {},
  };

  /**
   * Sets the name of the package.
   * @param name - The name of the package.
   * @returns The current instance of the PackageBuilder.
   */
  name(name: string) {
    const validName = CLINameSchema.parse(name);
    this._package.name = validName;
    return this;
  }

  /**
   * Sets the description of the package.
   * @param description - The description of the package.
   * @returns The current instance of the PackageBuilder.
   */
  description(description: string) {
    this._package.description = description;
    return this;
  }

  /**
   * Sets the version of the package.
   * @param version - The version of the package.
   * @returns The current instance of the PackageBuilder.
   */
  version(version: string) {
    const validVersion = MajorMinorPatchSchema.parse(version);
    this._package.version = validVersion;
    return this;
  }

  /**
   * Sets the commands of the package.
   * @param commands - An array of commands.
   * @returns The current instance of the PackageBuilder.
   */
  commands(commands: ICommand[]) {
    commands.forEach((command) => {
      if (this._package.commands[command.name])
        throw new Error(`Command duplicated: ${command.name}`);
      this._package.commands[command.name] = command;
    });
    return this;
  }

  /**
   * Builds the package.
   * @returns The built package.
   */
  build() {
    return new Package(this._package);
  }
}

/**
 * Represents a TerminalBuilder that is used to build a terminal configuration.
 */
export class TerminalBuilder {
  private _terminal: ITerminalBuilder = {
    name: "",
    version: "",
    commands: {},
    packages: {},
    history: [],
  };

  /**
   * Sets the name of the terminal.
   * @param name - The name of the terminal.
   * @returns The TerminalBuilder instance.
   */
  name(name: string) {
    const validName = CLINameSchema.parse(name);
    this._terminal.name = validName;
    return this;
  }

  /**
   * Sets the version of the terminal.
   * @param version - The version of the terminal.
   * @returns The TerminalBuilder instance.
   */
  version(version: string) {
    const validVersion = MajorMinorPatchSchema.parse(version);
    this._terminal.version = validVersion;
    return this;
  }

  /**
   * Sets the commands for the terminal.
   * @param commands - An array of ICommand objects representing the commands.
   * @returns The TerminalBuilder instance.
   */
  commands(commands: ICommand[]) {
    commands.forEach((command) => {
      if (this._terminal.commands[command.name])
        throw new Error(`Command duplicated: ${command.name}`);
      this._terminal.commands[command.name] = command;
    });
    return this;
  }

  /**
   * Sets the packages for the terminal.
   * @param packages - An array of IPackage objects representing the packages.
   * @returns The TerminalBuilder instance.
   */
  packages(packages: IPackageBuilder[]) {
    packages.forEach((pkg) => {
      if (this._terminal.packages[pkg.name])
        throw new Error(`Package duplicated: ${pkg.name}`);
      this._terminal.packages[pkg.name] = pkg;
    });
    return this;
  }

  /**
   * Builds and returns the terminal configuration.
   * @returns The terminal configuration.
   */
  build() {
    return new Terminal(this._terminal);
  }
}

/**
 * The Builder object provides methods for creating different types of builders.
 */
export const Builder = {
  /**
   * Creates a new TerminalBuilder instance.
   * @returns A new TerminalBuilder instance.
   */
  terminal() {
    return new TerminalBuilder();
  },
  /**
   * Creates a new PackageBuilder instance.
   * @returns A new PackageBuilder instance.
   */
  package() {
    return new PackageBuilder();
  },
  /**
   * Creates a new CommandBuilder instance.
   * @returns A new CommandBuilder instance.
   */
  command() {
    return new CommandBuilder();
  },
};
