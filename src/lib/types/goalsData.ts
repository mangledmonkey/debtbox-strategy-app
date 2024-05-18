import type { Goal } from ".";

export type GoalData = Goal & {
    weeklyReturns: number,
    monthlyReturn: number,
    yearlyReturns: number,
    totalNfts: number,
    totalCost: number,
    nftsRemaining: number,
    expectedCost: number,
};