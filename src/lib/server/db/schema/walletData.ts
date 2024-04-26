import type { Address } from 'viem';
import { sqliteTable, text, integer , uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { walletsTable } from './wallets';

export const walletDataTable = sqliteTable('wallets', {
    id: integer('id').$type<number>().primaryKey(),
    address: text('address', { length: 42 }).$type<Address>().notNull(),
  },(walletData) => ({
    addressIdx: uniqueIndex('addressIdx').on(walletData.address),
  })
);

export type WalletData = typeof walletDataTable.$inferSelect

export const walletDataRelations = relations(walletDataTable, ({ one }) => ({
    user: one(walletsTable, {
        fields: [walletDataTable.address],
        references: [walletsTable.address]
    }),
}));