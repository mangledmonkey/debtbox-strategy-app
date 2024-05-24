import Dexie, { type Table } from 'dexie';
import type { Goal, Wallet } from '$lib/types';

export class DebtBoxStrategyDexie extends Dexie {
    // Create the tables when declaring stores()
    goals!: Table<Goal>;
    wallets!: Table<Wallet>;

    constructor() {
        super('debtBoxStrategy');
        this.version(1).stores({
            goals: '++id, target, name, order',
            wallets: '++id, address, primary',
        });
    }
}

export const db = new DebtBoxStrategyDexie();