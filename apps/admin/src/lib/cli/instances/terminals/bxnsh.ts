import { Builder } from "../../builders";
import { clear } from "../commands/clear";
import { help } from "../commands/help";
import { blog } from "../packages/blog";

export const bxnsh = Builder.terminal()
  .name("bxnsh")
  .version("0.0.1")
  .commands([clear, help])
  .packages([blog])
  .build();
