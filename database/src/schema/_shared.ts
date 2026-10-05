import { uuid, timestamp } from "drizzle-orm/pg-core";
/** Conventions: uuid primary keys, timestamptz everywhere, snake_case columns, camelCase in TypeScript. */
export const pk = () => uuid("id").defaultRandom().primaryKey();
export const createdAt = () => timestamp("created_at", { withTimezone: true }).defaultNow().notNull();
export const updatedAt = () => timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date());
