export type RewardsChartDataValues = {
   id: number,
   timeframe: string,
   date: Date,
   rate: number,
   nfts: number,
   roi: number,
}

export type RewardsChartData = [
   string,
   RewardsChartDataValues[]
]