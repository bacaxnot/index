import { pgEnum, text, uuid } from "drizzle-orm/pg-core";
import { global } from "@/global/schema";
import { users } from "@/global/users/schema";
import { softDelete, timestamps } from "@/helpers";
import { relations } from "drizzle-orm";

export const assetType = pgEnum("asset_type", [
  "image",
  "video",
  "audio",
  "document",
]);

export const assets = global.table("assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: assetType("type").notNull(),
  url: text("url").notNull(),
  name: text("name").notNull().default("unnamed"),
  description: text("description").notNull().default("no description"),
  owner: uuid("owner").notNull(),
  ...timestamps,
  ...softDelete,
});

export const assetsRelations = relations(assets, ({ one }) => ({
  owner: one(users, {
    fields: [assets.owner],
    references: [users.id],
  }),
}));
