import { Builder } from "../../builders";

export const commandHelp = Builder.command()
  .name("help")
  .description("shows this help message.")
  .action(async ({ pkg }) => {
    if (!pkg) return "No package found.";

    const nextLine = "  \n";
    const blankLine = "\n\n";

    const commandsArray = Object.values(pkg.commands);
    const commands =
      commandsArray.length == 0
        ? "no registered commands."
        : commandsArray.reduce((acc, command) => {
            return `${acc}${command.name.padEnd(10)} - ${command.description}${nextLine}`;
          }, "");
    const title = `package: ${pkg.name} v${pkg.version}`;
    const description = "description: " + pkg.description;
    return (
      title +
      nextLine +
      description +
      blankLine +
      "commands:" +
      blankLine +
      commands
    );
  })
  .build();
