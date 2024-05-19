import type { 
    Goal,
    Goals,
    GoalData,
    GoalsData,
    StrategyValues,
    TokenData,
    TokensChartData,
    TokensChartOption,
    TokensChartOptions,
    WalletTotals,
    StackedTokensChartData
} from '$lib/types';

export function calculateGoals(goals: Goals, walletTotals: WalletTotals|undefined, strategyValues: StrategyValues): GoalsData {
    const goalsData: GoalsData = [];

    if (walletTotals && strategyValues) {
        for (let i = 0; i < goals.length; i += 1) {
            const goal: Goal = goals[i];
    
            const weeklyReturns = goal.target * 7;
            const monthlyReturns = goal.target * 30;
            const yearlyReturns = goal.target * 365;
            const totalNfts = Math.floor(goal.target / walletTotals.avgDailyNftReturn);
            const totalCost = (goal.target / walletTotals.avgDailyNftReturn) * strategyValues.nftCost;
            const nftsRemaining = totalNfts - walletTotals.stakedNfts;
            const expectedCost = nftsRemaining * strategyValues.nftCost;
            
            const goalData: GoalData = {
                ...goal,
                weeklyReturns,
                monthlyReturns,
                yearlyReturns,
                totalNfts,
                totalCost,
                nftsRemaining,
                expectedCost,
            };
    
            goalsData.push(goalData);
        }
    }

    return goalsData;
}


export function getTokensChartData(tokenData: TokenData[], strategyValues: StrategyValues): TokensChartOptions {
    const chartOptions: TokensChartOptions = [];
    const walletChartOptions: TokensChartOption = {
        label: 'In Wallet',
        value: [],
    };
    const perNftChartOptions: TokensChartOption = {
        label: 'Per Wallet NFT',
        value: [],
    };
    const allNftsChartOptions: TokensChartOption = {
        label: 'All Projects NFTs',
        value: [],
    };

    for (let i = 0; i < tokenData.length; i += 1) {
        const token: TokenData = tokenData[i];
        const symbol: string = token.symbol.toUpperCase();
        const walletCount: number = 
            token.stakedNfts
            + token.unstakedNfts
            + token.stakedMicros
            + token.unstakedMicros;
        const stakedWalletCount: number = token.stakedNfts + token.stakedMicros;
        console.log('🚀 ~ getTokensChartData ~ token:', token);

        const walletChartData: TokensChartData = {
            token: symbol,
            walletCount: stakedWalletCount,
            dailyRewardsRate: token.dailyWalletRewardsRate,
            dailyRewardsValue: token.dailyWalletRewardsValue,
            weeklyRewardsRate: token.weeklyWalletRewardsRate,
            weeklyRewardsValue: token.weeklyWalletRewardsValue,
            monthlyRewardsRate: token.monthlyWalletRewardsRate,
            monthlyRewardsValue: token.monthlyWalletRewardsValue,
            yearlyRewardsRate: token.yearlyWalletRewardsRate,
            yearlyRewardsValue: token.yearlyWalletRewardsValue,
            dailyRoi: walletCount > 0 ? token.dailyWalletRewardsValue / (strategyValues.nftCost * walletCount) : 0,
            weeklyRoi: walletCount > 0 ? token.weeklyWalletRewardsValue / (strategyValues.nftCost * walletCount) : 0,
            monthlyRoi: walletCount > 0 ? token.monthlyWalletRewardsValue / (strategyValues.nftCost * walletCount) : 0,
            annualizedRoi: walletCount > 0 ? token.yearlyWalletRewardsValue / (strategyValues.nftCost * walletCount) : 0,
        };

        for (let i = 0; i < walletCount; i += 1) {
            const start = i * token.dailyRewardsValue;
            const end = (i + 1) * token.dailyRewardsValue;

            const stackedWalletChartData: StackedTokensChartData = {
                ...walletChartData,
                keys:[
                    symbol,
                    token.dailyRewardsValue
                ],
                values: [
                    start,
                    end
                ]
            };

            walletChartOptions.value.push(stackedWalletChartData);
        }


        if (walletCount > 0) {
            const perNftChartData: StackedTokensChartData = {
                token: symbol,
                walletCount: token.stakedNfts + token.stakedMicros,
                dailyRewardsRate: token.dailyRewardsRate,
                dailyRewardsValue: token.dailyRewardsValue,
                weeklyRewardsRate: token.dailyRewardsRate * 7,
                weeklyRewardsValue: token.dailyRewardsValue * 7,
                monthlyRewardsRate: token.dailyRewardsRate * 30,
                monthlyRewardsValue: token.dailyRewardsValue * 30,
                yearlyRewardsRate: token.dailyRewardsRate * 365,
                yearlyRewardsValue: token.dailyRewardsValue * 365,
                dailyRoi: token.dailyRewardsValue / strategyValues.nftCost,
                weeklyRoi: (token.dailyRewardsValue * 7) / strategyValues.nftCost,
                monthlyRoi: (token.dailyRewardsValue * 30) / strategyValues.nftCost,
                annualizedRoi: (token.dailyRewardsValue * 365) / strategyValues.nftCost,
                keys: [
                    symbol,
                    token.dailyRewardsValue
                ],
                values: [
                    0,
                    token.dailyRewardsValue
                ] 
            };
    
            perNftChartOptions.value.push(perNftChartData);
        }

        const allNftsChartData: StackedTokensChartData = {
            token: symbol,
            walletCount: token.stakedNfts + token.stakedMicros,
            dailyRewardsRate: token.dailyRewardsRate,
            dailyRewardsValue: token.dailyRewardsValue,
            weeklyRewardsRate: token.dailyRewardsRate * 7,
            weeklyRewardsValue: token.dailyRewardsValue * 7,
            monthlyRewardsRate: token.dailyRewardsRate * 30,
            monthlyRewardsValue: token.dailyRewardsValue * 30,
            yearlyRewardsRate: token.dailyRewardsRate * 365,
            yearlyRewardsValue: token.dailyRewardsValue * 365,
            dailyRoi: token.dailyRewardsValue / strategyValues.nftCost,
            weeklyRoi: (token.dailyRewardsValue * 7) / strategyValues.nftCost,
            monthlyRoi: (token.dailyRewardsValue * 30) / strategyValues.nftCost,
            annualizedRoi: (token.dailyRewardsValue * 365) / strategyValues.nftCost,
            keys: [
                symbol,
                token.dailyRewardsValue
            ],
            values: [
                0,
                token.dailyRewardsValue
            ] 
        };

        allNftsChartOptions.value.push(allNftsChartData);
    }

    chartOptions.push(
        walletChartOptions,
        perNftChartOptions,
        allNftsChartOptions
    );

    return chartOptions;
}