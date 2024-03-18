import { Builder } from "@/lib/cli/builders";

export const newBlog = Builder.command()
  .name("new")
  .description("open ui to create a new blog post.")
  .action(async () => {
    window.location.href = "/blog/new";
    return "";
  })
  .build();
