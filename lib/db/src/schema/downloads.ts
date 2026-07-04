import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";

export const downloadsTable = pgTable("downloads", {
  id: integer("id").primaryKey().default(1),
  count: integer("count").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Downloads = typeof downloadsTable.$inferSelect;
