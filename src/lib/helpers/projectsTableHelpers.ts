import type { DebtBoxProject, DebtBoxToken, ProjectsTableData } from '$lib/types';
import { getTokenPrice, getTokenBalance, getRewardsData } from '$lib/utils';
import { type Address, getAddress, formatUnits } from 'viem';

/**
 * Get the data for the projects table
 * @param projects 
 * @param tokens 
 * @param signerAddress 
 * @returns project data formatted for table display
 */
export async function getProjectsTableData(projects: DebtBoxProject[], tokens: DebtBoxToken[], address: Address|string, chainId: number) {
    const tableData: ProjectsTableData[] = [];

    for (let i = 0; i < projects.length; i += 1) {
        const project = projects[i];
        const token: DebtBoxToken|undefined = tokens.find(token => token.id === project.relationships.token.data.id);
        const decimals: number = token?.attributes.decimals || 8;
        const rewardsData = await getRewardsData(project, address, chainId);

        // Prepare table data
        const price = getTokenPrice(tokens, project.relationships.token.data.id) || 0;
        const inWallet: number = token ? Number((await getTokenBalance(token, getAddress(address))).toFixed(4)) : 0;
        const walletValue: number = price && inWallet ? roundUnits(price * inWallet) : 0;
        const stakedNfts: number = 
        rewardsData?.stakedNfts ? Number(formatUnits(rewardsData?.stakedNfts, 0)) : 0;
        const unstakedNfts: number = 0; // TODO
        const totalNfts: number = stakedNfts + unstakedNfts;
        const rewardsRate: number = 
            rewardsData?.rewardsPerSecond
            ? Number(formatUnits(rewardsData?.rewardsPerSecond, decimals))
            : 0;
        const dailyRewardsRate: number = Number((rewardsRate * (60 * 60 * 24)).toFixed(4));
        const dailyWalletRewardsRate: number = Number((stakedNfts * dailyRewardsRate).toFixed(4));
        const rewards = 
            rewardsData?.pendingRewards 
            ? Number(Number(formatUnits(rewardsData?.pendingRewards, decimals)).toFixed(0))
            : 0; // TODO
        const rewardsValue: number = price && rewards ? roundUnits(price * rewards) : 0;
        
        const cell: ProjectsTableData = {
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
            dailyWalletRewardsRate,
            rewards,
            rewardsValue,
        }
        // console.log("🚀 ~ prepareProjectsTableData ~ cell:", cell)
        
        tableData.push(cell)
    }

    if (tableData)


    // console.log("🚀 ~ prepareProjectsTableData ~ tableData:", tableData)
    
    return tableData;
}

function roundUnits(number: number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}