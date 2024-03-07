import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DB_SERVERLESS_URL;
if (!connectionString) throw new Error("Missing DB_SERVERLESS_URL");

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
