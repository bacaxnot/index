import { migrate } from "drizzle-orm/postgres-js/migrator";
import { client, db } from "./";

console.log("migrating db...");

await migrate(db, { migrationsFolder: "migrations" });
await client.end();

console.log("db migrated!");
