import type { Address } from 'viem';
import { sqliteTable, text, integer  } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { usersTable } from './users';
import { walletDataTable } from './walletData';

export const walletsTable = sqliteTable('wallets', {
    id: integer('id').$type<number>().primaryKey(),
    userAddress: text('userAddress', { length: 42 }).$type<Address>().notNull(),
    address: text('address', { length: 42 }).$type<Address>().notNull()
  }
);

export type UserWallet = typeof walletsTable.$inferSelect;

export const walletsRelations = relations(walletsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [walletsTable.userAddress],
        references: [usersTable.address]
    }),
    walletData: one(walletDataTable, {
      fields: [walletsTable.address],
      references: [walletDataTable.address]
    })
}));