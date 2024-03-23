import { listPosts } from "@bxn/database/blog/posts/manager";
import handler from "../helpers";

type Props = {
  title: string;
  slug?: string;
  content: string;
};

export const main = handler(async ({ title, slug, content }: Props) => {
  console.log(title, content, slug);

  const posts = await listPosts({});
  console.log(posts);

  return { success: true };
});
