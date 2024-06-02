import type { Goal, User, Wallet } from '$lib/types';
import Dexie, { type Table } from 'dexie';
import relationships from 'dexie-relationships';

export class DebtRewardsStrategyDexie extends Dexie {
    // Create the tables when declaring stores()
    users!: Table<User>;
    wallets!: Table<Wallet>;
    goals!: Table<Goal>;

    constructor() {
        super('DebtRewardsStrategy', {addons: [relationships]});
        this.version(1).stores({
            users: '++id, &address',
            goals: '++id, userId -> users.id, &target, &name',
            wallets: '++id, userId -> users.id, order, &address',
        });
    }
}

export const db = new DebtRewardsStrategyDexie();