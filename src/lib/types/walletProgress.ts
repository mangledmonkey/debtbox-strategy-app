import type { Writable } from "svelte/store";
import type { Address } from "viem";

export type WalletProgress = {
    wallet: Address|string|null,
    stage: number,
};

export type WalletProgressStatus = {
    stages: number,
    stage: number, 
};

export type WalletProgressData = {
    walletCount: number,
    wallets: WalletProgress[],
    status: WalletProgressStatus,
};

export type WalletProgressDataContext = Writable<WalletProgressData|undefined>;