import type { Config } from "drizzle-kit";

console.log(process.env.DATABASE_HOST);

export default {
  schema: "./db/schema.ts",
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: "default",
} satisfies Config;
