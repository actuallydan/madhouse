// db.ts
import {
  int,
  mysqlTable,
  serial,
  varchar,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

// generate schema with `pnpm drizzle-kit generate:mysql --schema=./src/db/schema.ts`

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }),
  description: text("description"),
  domain: varchar("domain", { length: 256 }),
  file: varchar("file", { length: 256 }),
  isVideo: boolean("isVideo"),
  createdAt: int("createdAt"),
  updatedAt: int("updatedAt"),
});

// export type Post = InferModel<typeof users>; // return type when queried
