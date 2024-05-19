import type { TokenData } from "$lib/types";

function sumRewardsValues(tokens: TokenData[], property: string): number {
    const values: number[] = tokens.map(token => {
        return token[property];
    });

    return values.reduce((total, val) => total + val, 0);
}

export function getRewardsTotals(tokens: TokenData[]) {
    const totals = {
        inWallet: sumRewardsValues(tokens, 'inWallet'),
        walletValue: sumRewardsValues(tokens, 'walletValue'),
        rewardsValue: sumRewardsValues(tokens, 'rewardsValue'),
        stakedNfts: sumRewardsValues(tokens, 'stakedNfts'),
        dailyRewardsValue: sumRewardsValues(tokens, 'dailyRewardsValue'),
        dailyWalletRewardsValue: sumRewardsValues(tokens, 'dailyWalletRewardsValue'),
        weeklyWalletRewardsValue: sumRewardsValues(tokens, 'weeklyWalletRewardsValue'),
        monthlyWalletRewardsValue: sumRewardsValues(tokens, 'monthlyWalletRewardsValue'),
        yearlyWalletRewardsValue: sumRewardsValues(tokens, 'yearlyWalletRewardsValue'),
    };

    return totals;
}