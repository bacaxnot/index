import { listPosts } from "@bxn/database/blog/posts/manager";
import handler from "../helpers";

type Props = {
  title: string;
  slug?: string;
  content: string;
  image?: string;
};

// export const main = handler(async (payload: unknown) => {
//   console.log("Creating post", { payload });
//   const posts = await listPosts({});
//   console.log(posts);

//   return { success: true };
// });

export const main = async (payload: unknown) => {
  console.log("Creating post", { payload });
  return JSON.stringify({ success: true });
};
