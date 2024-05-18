export type TokensChartData = {
    token: string,
    walletCount: number,
    dailyRewardsRate: number,
    dailyRewardsValue: number,
    weeklyRewardsRate: number,
    weeklyRewardsValue: number,
    monthlyRewardsRate: number,
    monthlyRewardsValue: number,
    yearlyRewardsRate: number,
    yearlyRewardsValue: number,
    dailyRoi: number,
    weeklyRoi: number,
    monthlyRoi: number,
    annualizedRoi: number,
};

export type StackedTokensChartData = TokensChartData & {
    keys: (string|number)[],
    values: (string|number)[],
};

export type TokensChartOption = {
    label: string,
    value: TokensChartData[] | StackedTokensChartData[],
};

export type TokensChartOptions = TokensChartOption[];