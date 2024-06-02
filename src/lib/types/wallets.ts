import type { Writable } from "svelte/store";
import type { Address } from "viem";

export type Wallet = {
    id?: number,
    userId: number|undefined,
    order: number,
    address: Address|string,
};

export type Wallets = Wallet[];

export type WalletsContext = Writable<Wallets>|undefined;