import "dotenv/config";
import type { Config } from "drizzle-kit";

if (!process.env.DB_SERVERLESS_URL)
  throw new Error("Missing DB_SERVERLESS_URL");

export default {
  schema: "./src/**/**/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_SERVERLESS_URL,
  },
  schemaFilter: ["global", "blog", "thoughts"],
  verbose: true,
  strict: true,
} satisfies Config;
