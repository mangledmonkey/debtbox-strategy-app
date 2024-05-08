
import type {
    CompoundValue,
    CompoundValues,
    StrategyValues,
    WalletTotals
} from "$lib/types"

export function getCompoundValues(walletTotals: WalletTotals, strategyValues: StrategyValues): CompoundValues {
    const compoundValues: CompoundValues = []

    for (let i = 0; i < strategyValues.projectionMonths; i += 1) {
        const prevMonth = compoundValues[i-1] || null
        const id = i;
        const date: Date = new Date();
        date.setMonth(date.getMonth() + i);

        const dailyRewardsValue: number = prevMonth 
            ? prevMonth.dailyRewardsValue + prevMonth.dailyRewardsIncrease
            : walletTotals.dailyReturns;
        const weeklyRewardsValue: number = dailyRewardsValue * 7;
        const monthlyRewardsValue: number = dailyRewardsValue * 30;
        const annualizedRewardsValue: number = dailyRewardsValue * 365;
        const govTaxes: number = monthlyRewardsValue * (strategyValues.govTaxes / 100);
        const taxesReserved: number = prevMonth 
            ? compoundValues[i-1].taxesReserved + govTaxes
            : govTaxes;
        const txTaxes: number = monthlyRewardsValue * (strategyValues.txTaxes / 100);
        const personalReserve = monthlyRewardsValue * (strategyValues.personalReserve / 100);
        const personalTotal: number = prevMonth
            ? prevMonth.personalReserve + personalReserve
            : personalReserve;
        const usableClaim: number = monthlyRewardsValue - govTaxes - txTaxes - personalReserve;
        const walletBalance: number = usableClaim +
            (prevMonth
                ? prevMonth.walletEndValue
                : walletTotals.walletBalance);
        const nftsNew = Math.floor(walletBalance / strategyValues.nftCost);
        const nftsEnd: number = nftsNew + 
            (prevMonth 
                ? prevMonth.nftsEnd
                : walletTotals.stakedNfts);
        const txFees = nftsNew * strategyValues.mintStakeTxFee;
        // const newStakedTokens: number = 0; // TODO: requires DEBT token staking quantity
        // const newTokensStakingCost: number = 0; // TODO: requires DEBT token staking quantity
        // const stakedTokens: number = 0; // TODO: requires DEBT token staking quantity
        // const stakedTokensValue: number = 0; // TODO: requires DEBT token staking quantity
        const stakedNftsValue: number = nftsEnd * strategyValues.nftCost;
        const totalCost: number = stakedNftsValue // TODO: Add staked tokens value
        const walletEndValue: number = walletBalance - txFees - (nftsNew * strategyValues.nftCost)
        const dailyRewardsIncrease: number = nftsNew * (walletTotals.dailyReturns / walletTotals.stakedNfts)
        const dailyPercentIncrease: number = dailyRewardsIncrease / dailyRewardsValue;
        const roiDaily: number = dailyRewardsValue / totalCost;
        const roiWeekly: number = weeklyRewardsValue / totalCost;
        const roiMonthly: number = monthlyRewardsValue / totalCost;
        const roiAnnualized: number = annualizedRewardsValue / totalCost;
        const yearlyRewardsEarned: number = prevMonth
            ? prevMonth.yearlyRewardsEarned + monthlyRewardsValue
            : monthlyRewardsValue;

        const values: CompoundValue = {
            id,
            date,
            dailyRewardsValue,
            weeklyRewardsValue,
            monthlyRewardsValue,
            annualizedRewardsValue,
            govTaxes,
            taxesReserved,
            txTaxes,
            personalReserve,
            personalTotal,
            usableClaim,
            walletBalance,
            nftsNew,
            nftsEnd,
            txFees,
            // newStakedTokens,
            // newTokenStakingCost,
            // stakedTokens,
            // stakedTokensValue,
            stakedNftsValue,
            totalCost,
            walletEndValue,
            dailyRewardsIncrease,
            dailyPercentIncrease,
            roiDaily,
            roiWeekly,
            roiMonthly,
            roiAnnualized,
            yearlyRewardsEarned
        }

        compoundValues.push(values)
    }

    // console.log('🚀 ~ getStrategyValues ~ compoundValues:', compoundValues)
    return compoundValues
}
