import type { Address } from 'viem';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const goalsTable = sqliteTable('goals', {
    id: integer('id').$type<number>().primaryKey(),
    address: text('address', { length: 42 }).$type<Address>().notNull(),
    order: integer('order').$type<number>().notNull(),
    target: integer('target').$type<number>().notNull(),
    name: text('name').$type<string>(),
  }
);

export type Goal = typeof goalsTable.$inferSelect;
export type Goals = Goal[];

export const goalsRelations = relations(goalsTable, ({ one }) => ({
    user: one(goalsTable, {
        fields: [goalsTable.address],
        references: [goalsTable.address]
    }),
}));