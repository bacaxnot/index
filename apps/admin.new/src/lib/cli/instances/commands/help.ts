import { Builder } from "../../builders";

export const help = Builder.command()
  .name("help")
  .description("shows this help message.")
  .action(async ({ terminal }) => {
    const nextLine = "  \n";
    const blankLine = "\n\n";

    const commandsArray = Object.values(terminal.commands);
    const commands =
      commandsArray.length == 0
        ? "no registered commands."
        : commandsArray.reduce((acc, command) => {
            return `${acc}${command.name.padEnd(10)} - ${command.description}${nextLine}`;
          }, "");

    const packagesArray = Object.values(terminal.packages);
    const packages =
      packagesArray.length == 0
        ? "no registered packages."
        : packagesArray.reduce((acc, pkg) => {
            return `${acc}${pkg.name.padEnd(10)} - ${pkg.description}${nextLine}`;
          }, "");

    return (
      "commands:" +
      blankLine +
      commands +
      blankLine +
      "packages:" +
      blankLine +
      packages
    );
  })
  .build();
