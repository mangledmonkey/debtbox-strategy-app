import type { StrategyValues } from '$lib/types'

export const defaultValues: StrategyValues = {
    avgCollectionCost: 10,
    govTaxes: 30, // percent
    txTaxes: 10,// percent
    mintStakeTxFee: 1.2,
    personalReserve: 2.5, // percent
    nftCost: 25,
    maxNftsPerWallet: 25,
    debtTokenPrice: 0,
    stakedDebtTokens: 0,
    projectionMonths: 36,
}