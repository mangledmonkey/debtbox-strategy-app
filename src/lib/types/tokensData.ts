import type { Address } from "viem";
import type { WalletTotals } from ".";

export type TokenData = {
    id: number,
    address: Address|string|null,
    icon: string,
    name: string,
    symbol: string,
    price: number,
    inWallet: number,
    walletValue: number,
    stakedNfts: number,
    unstakedNfts: number,
    stakedMicros: number,
    unstakedMicros: number,
    totalNfts: number,
    rewardsRate: number,
    dailyRewardsRate: number,
    dailyRewardsValue: number,
    dailyWalletRewardsRate: number,
    dailyWalletRewardsValue: number,
    weeklyWalletRewardsRate: number,
    weeklyWalletRewardsValue: number,
    monthlyWalletRewardsRate: number,
    monthlyWalletRewardsValue: number,
    yearlyWalletRewardsRate: number,
    yearlyWalletRewardsValue: number,
    rewards: number,
    rewardsValue: number,
};

export type TokensData = {
    tokens: (void|TokenData)[]
    totals: WalletTotals
};