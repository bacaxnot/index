DO $$ BEGIN
 CREATE TYPE "asset_type" AS ENUM('image', 'video', 'audio', 'document');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "global"."assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "asset_type" NOT NULL,
	"url" text NOT NULL,
	"name" text DEFAULT 'unnamed' NOT NULL,
	"description" text DEFAULT 'no description' NOT NULL,
	"owner" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "blog"."posts" RENAME COLUMN "author_id" TO "author";--> statement-breakpoint
ALTER TABLE "blog"."posts" DROP CONSTRAINT "posts_author_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "blog"."posts" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "global"."users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "global"."users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "global"."users" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog"."posts" ADD CONSTRAINT "posts_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "global"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "global"."assets" ADD CONSTRAINT "assets_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "global"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
