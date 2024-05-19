import type { Goal } from ".";

export type GoalData = Goal & {
    weeklyReturns: number,
    monthlyReturns: number,
    yearlyReturns: number,
    totalNfts: number,
    totalCost: number,
    nftsRemaining: number,
    expectedCost: number,
};

export type GoalsData = GoalData[];