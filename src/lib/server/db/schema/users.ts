import type { Address } from 'viem';
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { walletsTable } from './wallets';

export const usersTable = sqliteTable('users', {
    id: integer('id').$type<number>().primaryKey(),
    address: text('address', { length: 42 }).$type<Address>().notNull(),
  }, (users) => ({
    addressIdx: uniqueIndex('addressIdx').on(users.address),
  })
);

export type User = typeof usersTable.$inferSelect

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(walletsTable),
}));