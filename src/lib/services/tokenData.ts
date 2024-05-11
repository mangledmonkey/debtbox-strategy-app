import type { DebtBoxProject, DebtBoxToken, TokenData, TokensData, WalletTotals } from '$lib/types';
import { getTokenPrice, getTokenBalance, getRewardsData, roundUnits, getWalletTotals } from '$lib/utils';
import { type Address, getAddress, formatUnits } from 'viem';

/**
 * Get the data for the projects table
 * @param projects 
 * @param tokens 
 * @param signerAddress 
 * @returns project data formatted for table display
 */
export async function getTokensData(projects: DebtBoxProject[], tokens: DebtBoxToken[], address: Address|string, chainId: number): Promise<TokensData> {
    // const multicallData: MulticallData[] = getMulticallData(projects, tokens, address, chainId)

    // Collect token values
    async function getTokenData(project: DebtBoxProject, i: number): Promise<TokenData|void> {
    // for (let i = 0; i < projects.length; i += 1) {
        // const project = projects[i];
        const token: DebtBoxToken|undefined = tokens.find(token => token.id === project.relationships.token.data.id);
        const decimals: number = token?.attributes.decimals || 8;
        const rewardsData = await getRewardsData(project, address, chainId);

        // Prepare table data
        const price = getTokenPrice(tokens, project.relationships.token.data.id) || 0;
        const inWallet: number = token ? Number((await getTokenBalance(token, getAddress(address))).toFixed(4)) : 0;
        const walletValue: number = price && inWallet ? price * inWallet : 0;
        const stakedNfts: number = 
            rewardsData?.stakedNfts ? Number(formatUnits(rewardsData?.stakedNfts, 0)) : 0;
        const unstakedNfts: number =  0; //getUnstakedNfts() || 0; // TODO
        const stakedMicros: number =
            rewardsData?.stakedMicros ? Number(formatUnits(rewardsData?.stakedMicros, 0)) : 0;
        const unstakedMicros: number =  0; //getUnstakedNfts() || 0; // TODO
        const totalNfts: number = stakedNfts + unstakedNfts + stakedMicros + unstakedMicros;
        const rewardsRate: number = 
            rewardsData?.rewardsPerSecond
            ? Number(formatUnits(rewardsData?.rewardsPerSecond, decimals))
            : 0;
        const dailyRewardsRate: number = rewardsRate * (60 * 60 * 24);
        const dailyRewardsValue: number = dailyRewardsRate * price;
        const dailyWalletRewardsRate: number = stakedNfts * dailyRewardsRate;
        const dailyWalletRewardsValue: number = dailyWalletRewardsRate * price;
        const weeklyWalletRewardsRate: number = dailyWalletRewardsRate * 7;
        const weeklyWalletRewardsValue: number = weeklyWalletRewardsRate * price;
        const monthlyWalletRewardsRate: number = dailyWalletRewardsRate * 30;
        const monthlyWalletRewardsValue: number = monthlyWalletRewardsRate * price;
        const yearlyWalletRewardsRate: number = dailyWalletRewardsRate * 365;
        const yearlyWalletRewardsValue: number = yearlyWalletRewardsRate * price;
        const rewards = 
            rewardsData?.pendingRewards 
            ? Number(Number(formatUnits(rewardsData?.pendingRewards, decimals)).toFixed(0))
            : 0; // TODO
        const rewardsValue: number = price && rewards ? roundUnits(price * rewards) : 0;

        
        const values: TokenData = {
            id: i,
            address: token?.attributes.address,
            icon: project.attributes.uiConfig.logoUri,
            name: project.attributes.name,
            price,
            inWallet,
            walletValue,
            stakedNfts,
            unstakedNfts,
            stakedMicros,
            unstakedMicros,
            totalNfts,
            rewardsRate,
            dailyRewardsRate,
            dailyRewardsValue,
            dailyWalletRewardsRate,
            dailyWalletRewardsValue,
            weeklyWalletRewardsRate,
            weeklyWalletRewardsValue,
            monthlyWalletRewardsRate,
            monthlyWalletRewardsValue,
            yearlyWalletRewardsRate,
            yearlyWalletRewardsValue,
            rewards,
            rewardsValue,
        }

        if (totalNfts === 0 && project.attributes.name !== 'DEBT') {
            throw new Error(`No NFTs in ${address} for ${project.attributes.name}`)
        }
        // tokenValues.push(values)
        return values
    }

    const tokenData: Promise<TokenData|void>[] = projects.map((project, i) => {
        return getTokenData(project, i).catch(error => undefined)
    })
    console.log('🚀 ~ consttokenData:Promise<TokenData|undefined>[]=projects.map ~ tokenData:', tokenData)

    const tokenValues = await Promise.all(tokenData)
    
    const filteredTokenValues: (TokenData|void)[] = tokenValues.filter(results => results !== undefined)

    // Total the wallet values
    const totals: WalletTotals = getWalletTotals(filteredTokenValues);

    // console.log("🚀 ~ prepareTokensData ~ cell:", cell)
    const tokensData = {
        tokens: filteredTokenValues,
        totals
    }

    if (!tokensData) throw new Error(`No NFTs in wallet for ${address}`)
    
    return tokensData;
}