import type { Writable } from "svelte/store";

export type StrategyValues = {
    avgCollectionCost: number,
    govTaxes: number,
    txTaxes: number,
    personalReserve: number,
    nftCost: number,
    mintStakeTxFee: number,
    maxNftsPerWallet: number,
    debtTokenPrice: number,
    stakedDebtTokens: number,
    projectionMonths: number,
};

export type StrategyValuesContext = Writable<StrategyValues>;