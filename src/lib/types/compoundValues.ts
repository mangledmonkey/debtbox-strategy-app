import type { Writable } from "svelte/store";
import type { StrategyValues } from ".";

export type CompoundValue = {
    id: number,
    date: Date,
    dailyRewardsValue: number,
    weeklyRewardsValue: number,
    monthlyRewardsValue: number,
    annualizedRewardsValue: number,
    govTaxes: number,
    taxesReserved: number,
    txTaxes: number, 
    personalReserve: number,
    personalTotal: number,
    usableClaim: number,
    walletBalance: number,
    nftsNew: number,
    nftsEnd: number,
    txFees: number,
    // newStakedTokens: number,
    // newTokenStakingCost: number,
    // stakedTokens: number,
    // stakedTokensValue: number,
    stakedNftsValue: number,
    totalCost: number,
    walletEndValue: number,
    dailyRewardsIncrease: number,
    dailyPercentIncrease: number,
    roiDaily: number,
    roiWeekly: number,
    roiMonthly: number,
    roiAnnualized: number,
    yearlyRewardsEarned: number
};

export type CompoundValues = CompoundValue[];

export type CompoundValuesContext = Writable<StrategyValues|undefined>;