ALTER TABLE "blog"."posts" DROP CONSTRAINT "posts_author_users_id_fk";
--> statement-breakpoint
ALTER TABLE "global"."assets" DROP CONSTRAINT "assets_owner_users_id_fk";
--> statement-breakpoint
ALTER TABLE "blog"."posts" ADD COLUMN "image" uuid;--> statement-breakpoint
ALTER TABLE "blog"."posts" ADD COLUMN "audio" uuid;--> statement-breakpoint
ALTER TABLE "global"."users" ADD COLUMN "avatar" uuid;