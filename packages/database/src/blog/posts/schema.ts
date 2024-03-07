import { text, uuid } from "drizzle-orm/pg-core";
import { blog } from "@/blog/schema";
import { users } from "@/global/users/schema";
import { softDelete, timestamps } from "@/helpers";
import { assets } from "@/global/assets/schema";
import { relations } from "drizzle-orm";

export const posts = blog.table("posts", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: uuid("author").notNull(),
  image: uuid("image"),
  audio: uuid("audio"),
  ...timestamps,
  ...softDelete,
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.author],
    references: [users.id],
  }),
  image: one(assets, {
    fields: [posts.image],
    references: [assets.id],
  }),
  audio: one(assets, {
    fields: [posts.audio],
    references: [assets.id],
  }),
}));
