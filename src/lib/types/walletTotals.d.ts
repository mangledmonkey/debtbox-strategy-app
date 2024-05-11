export type WalletTotals = {
    debtPrice: number,
    totalNfts: number,
    stakedNfts: number,
    unstakedNfts: number,
    dailyReturns: number,
    walletBalance: number,
    rewardsBalance: number,
    avgDailyNftReturn: number,
}

type WalletTotalsContext = Writable<WalletTotals|undefined>
type WalletDataContext = Writable<Options>