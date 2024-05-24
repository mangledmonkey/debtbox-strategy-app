import type { Writable } from "svelte/store";
import type { Address } from "viem";

export type Wallet = {
    id?: number,
    address: Address|string,
    primary?: boolean,
};

export type Wallets = Wallet[];

export type WalletsContext = Writable<Wallets>|undefined;