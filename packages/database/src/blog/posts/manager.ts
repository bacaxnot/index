import { PostType, posts } from "./schema";
import { users } from "@/global/users/schema";
import { db } from "@/index";
import { and, eq, isNotNull, isNull } from "drizzle-orm";

type PostsFilter = {
  /**
   * Filter by active status. If false, it will return deleted posts. By default it's true
   */
  active?: boolean;
  /**
   * Filter by author username
   */
  byAuthor?: string;
};

/**
 * Retrieves a list of posts based on the specified filter criteria.
 * @param {PostsFilter} filter - The filter criteria for retrieving the posts.
 * @returns {Promise<PostType[]>} - A promise that resolves to an array of posts.
 */
export async function listPosts({
  byAuthor,
  active = true,
}: PostsFilter): Promise<PostType[]> {
  const filters = [];

  if (byAuthor) {
    const res = await db
      .select()
      .from(users)
      .limit(1)
      .where(eq(users.username, byAuthor));
    const author = res[0];
    if (author) filters.push(eq(posts.author, author.username));
  }

  if (active) filters.push(isNull(posts.deletedAt));
  else filters.push(isNotNull(posts.deletedAt));

  const query = await db
    .select()
    .from(posts)
    .where(and(...filters));
  return query;
}
