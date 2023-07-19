import type { Config } from "drizzle-kit";
import { env } from "~/env.mjs";

export default {
  schema: "./db/schema.ts",
  dbCredentials: {
    host: env.DATABASE_HOST,
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: "default",
  },
} satisfies Config;
