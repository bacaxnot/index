import { global } from "@/global/schema";
import { softDelete, timestamps } from "@/helpers";
import { pgEnum, text, uuid } from "drizzle-orm/pg-core";
import { assets } from "@/global/assets/schema";
import { relations } from "drizzle-orm";

export const role = pgEnum("role", ["admin", "user"]);

export const users = global.table("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull().default(""),
  name: text("name").notNull().default(""),
  authId: text("auth_id").notNull(),
  role: role("role").notNull().default("user"),
  avatar: uuid("avatar"),
  ...timestamps,
  ...softDelete,
});

export const usersRelations = relations(users, ({ one }) => ({
  avatar: one(assets, {
    fields: [users.avatar],
    references: [assets.id],
  }),
}));
