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
    async function getTokenData(project: DebtBoxProject, i: number): Promise<TokenData> {
    // for (let i = 0; i < projects.length; i += 1) {
        // const project = projects[i];
        const token: DebtBoxToken|undefined = tokens.find(token => token.id === project.relationships.token.data.id);
        const decimals: number = token?.attributes.decimals || 8;
        const rewardsData = await getRewardsData(project, address, chainId);

        // Prepare table data
        const price = getTokenPrice(tokens, project.relationships.token.data.id) || 0;
        const inWallet: number = token ? Number((await getTokenBalance(token, getAddress(address))).toFixed(4)) : 0;
        const walletValue: number = price && inWallet ? roundUnits(price * inWallet) : 0;
        const stakedNfts: number = 
        rewardsData?.stakedNfts ? Number(formatUnits(rewardsData?.stakedNfts, 0)) : 0;
        const unstakedNfts: number =  0; //getUnstakedNfts() || 0; // TODO
        const totalNfts: number = stakedNfts + unstakedNfts;
        const rewardsRate: number = 
            rewardsData?.rewardsPerSecond
            ? Number(formatUnits(rewardsData?.rewardsPerSecond, decimals))
            : 0;
        const dailyRewardsRate: number = Number((rewardsRate * (60 * 60 * 24)).toFixed(4));
        const dailyRewardsValue: number = roundUnits(price * dailyRewardsRate);
        const dailyWalletRewardsRate: number = Number((stakedNfts * dailyRewardsRate).toFixed(4));
        const dailyWalletRewardsValue: number = roundUnits(price * dailyWalletRewardsRate);
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
            totalNfts,
            rewardsRate,
            dailyRewardsRate,
            dailyRewardsValue,
            dailyWalletRewardsRate,
            dailyWalletRewardsValue,
            rewards,
            rewardsValue,
        }

        // tokenValues.push(values)
        return values;
    }

    const tokenData: Promise<TokenData>[] = projects.map((project, i) => {
        return getTokenData(project, i);
    })

    const tokenValues = await Promise.all(tokenData)

    // Total the wallet values
    const totals: WalletTotals = getWalletTotals(tokenValues);

    // console.log("🚀 ~ prepareTokensData ~ cell:", cell)
    const tokensData = {
        tokens: tokenValues,
        totals
    }
    
    return tokensData;
}