import { Builder } from "../../builders";

export const clear = Builder.command()
  .name("clear")
  .description("clears the terminal history.")
  .config({ saveToHistory: false })
  .action(async ({ terminal }) => {
    terminal.history = [];
    return "";
  })
  .build();
