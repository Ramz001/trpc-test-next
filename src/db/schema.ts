import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text(),
});
