import type { Writable } from "svelte/store";
import type { Options } from "./svelteUx";
import type { DebtStakingData } from "./debtStakingData";

export type WalletTotals = DebtStakingData & {
    debtPrice: number,
    totalNfts: number,
    stakedNfts: number,
    unstakedNfts: number,
    dailyReturns: number,
    walletBalance: number,
    rewardsBalance: number,
    avgDailyNftReturn: number,
};

export type WalletTotalsContext = Writable<WalletTotals|undefined>;
export type WalletDataContext = Writable<Options>;