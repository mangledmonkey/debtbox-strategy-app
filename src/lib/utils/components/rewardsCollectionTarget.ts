import type { BreakdownData, StrategyValues, WalletTotals } from "$lib/types";
import currency from "currency.js";

export function getCountdown(collectionTarget: number, walletTotals: WalletTotals ): number {
    return Number(currency((collectionTarget - walletTotals.rewardsBalance) / walletTotals.dailyReturns, { precision: 1 })) || 0;
}


export function getStatusColor(time: number) {
    if (time <= 0) {
        return 'green-500';
    } else if (time > 0 && time <= 2) {
        return 'blue-500';
    } else if (time > 2 && time <= 5) {
        return 'yellow-500';
    }

    return 'red-500';
}

export function updateCompoundBreakdown(
    walletTotals: WalletTotals,
    strategyValues: StrategyValues
): BreakdownData {
    const rewardsBalance = walletTotals.rewardsBalance;
   
    const govTaxes = rewardsBalance * (strategyValues.govTaxes/100);
    const txTaxes = rewardsBalance * (strategyValues.txTaxes/100);
    const personalReserve = rewardsBalance * (strategyValues.personalReserve/100);
    const usableClaim = rewardsBalance - (govTaxes + txTaxes + personalReserve);
    const newNfts = Math.floor(usableClaim / strategyValues.nftCost);
    const dailyIncrease = newNfts * walletTotals.avgDailyNftReturn || 0;

    return {
        govTaxes,
        txTaxes,
        personalReserve,
        usableClaim,
        newNfts,
        dailyIncrease
    };
}
