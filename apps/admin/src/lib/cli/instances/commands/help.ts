import { Builder } from "../../builders";

export const help = Builder.command()
  .name("help")
  .description("shows this help message.")
  .action(async ({ terminal }) => {
    return Object.values(terminal.commands).reduce((acc, command) => {
      return `${acc}${command.name.padEnd(10)} - ${command.description}  \n`;
    }, "");
  })
  .build();
