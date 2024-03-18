import { type ICommand } from "./command";

export type IPackageBuilder = {
  name: string;
  description: string;
  version: string;
  commands: Record<string, ICommand>;
};

export type IPackage = IPackageBuilder;

export class Package implements IPackage {
  name: string;
  description: string;
  version: string;
  commands: Record<string, ICommand>;

  constructor(pkg: IPackageBuilder) {
    this.name = pkg.name;
    this.description = pkg.description;
    this.version = pkg.version;
    this.commands = pkg.commands;
  }
}
