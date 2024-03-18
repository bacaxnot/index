import { Builder } from "@/lib/cli/builders";
import { commandHelp } from "../helpers.commands";
import { newBlog } from "./new";

export const blog = Builder.package()
  .name("blog")
  .version("0.1.1")
  .description("commands to manage your blog.")
  .commands([commandHelp, newBlog])
  .build();
