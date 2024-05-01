import type { WalletTotals } from "."

export type TokenData = {
    id: number,
    address: Address|string|null,
    icon: string,
    name: string,
    price: number,
    inWallet: number,
    walletValue: number,
    stakedNfts: number,
    unstakedNfts: number,
    totalNfts: number,
    rewardsRate: number,
    dailyRewardsRate: number,
    dailyRewardsValue: number,
    dailyWalletRewardsRate: number,
    dailyWalletRewardsValue: number,
    rewards: number,
    rewardsValue: number,
}

export type TokensData = {
    tokens: TokenData[],
    totals: WalletTotals
}