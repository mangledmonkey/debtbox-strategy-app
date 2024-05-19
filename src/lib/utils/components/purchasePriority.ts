import type { TokenData } from '$lib/types';

export function sortTokensByDailyRewardsValue(tokenData: TokenData[]): TokenData[] {
    const sortedTokenData: TokenData[] = [...tokenData];

    return sortedTokenData.sort((a, b) => {
        const keyA = a.dailyRewardsValue;
        const keyB = b.dailyRewardsValue;
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });
}